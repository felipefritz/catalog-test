const path = require('path');
const gateway = require('express-gateway');
const promClient = require('prom-client');
const http = require('http');

// Inicializar el registro de métricas de Prometheus
const register = new promClient.Registry();

// Habilitar métricas por defecto
promClient.collectDefaultMetrics({ register });

// Contador para peticiones HTTP
const httpRequestsTotal = new promClient.Counter({
  name: 'gateway_http_requests_total',
  help: 'Total de peticiones HTTP procesadas por el gateway',
  labelNames: ['method', 'endpoint', 'status_code'],
  registers: [register]
});

// Histograma para la duración
const httpRequestDurationMicroseconds = new promClient.Histogram({
  name: 'gateway_http_request_duration_seconds',
  help: 'Duración de las peticiones HTTP en segundos',
  labelNames: ['method', 'endpoint', 'status_code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10],
  registers: [register]
});

// Crear un servidor HTTP separado para métricas
const metricsServer = http.createServer(async (req, res) => {
  if (req.url === '/metrics') {
    res.setHeader('Content-Type', register.contentType);
    res.end(await register.metrics());
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

// Escuchar en el puerto 9090 para métricas
metricsServer.listen(9090, () => {
  console.log('Servidor de métricas Prometheus escuchando en puerto 9090');
});

// Monkey patching para capturar métricas HTTP
const originalEmit = http.Server.prototype.emit;
http.Server.prototype.emit = function(event, req, res, ...args) {
  if (event === 'request') {
    const startTime = process.hrtime();
    const endpoint = req.url.split('?')[0];
    
    // Sobrescribir el método end para capturar métricas al finalizar
    const originalEnd = res.end;
    res.end = function(chunk, encoding) {
      // Calcular duración
      const diff = process.hrtime(startTime);
      const duration = diff[0] + diff[1] / 1e9;
      
      // Registrar métricas
      httpRequestsTotal.inc({
        method: req.method,
        endpoint: endpoint,
        status_code: res.statusCode
      });
      
      httpRequestDurationMicroseconds.observe(
        {
          method: req.method,
          endpoint: endpoint,
          status_code: res.statusCode
        },
        duration
      );
      
      // Llamar al método original
      return originalEnd.apply(this, arguments);
    };
  }
  
  return originalEmit.apply(this, [event, req, res, ...args]);
};

// Iniciar Express Gateway
gateway()
  .load(path.join(__dirname, 'config'))
  .run();

console.log('API Gateway iniciado con métricas de Prometheus disponibles en http://localhost:9090/metrics');