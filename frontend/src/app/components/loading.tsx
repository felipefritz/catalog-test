import React from 'react';
import {toAbsoluteUrl} from '../../_metronic/helpers'

const Loading: React.FC = () => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 1300,
      }}
    >
      {/* Logo con animación de zoom */}
      <div
        className="mb-4"
        style={{
          animation: 'zoomAnimation 1.5s infinite',
        }}
      >
        <img
          src={toAbsoluteUrl("media/logos/bhp-logo-vector.svg")}
          alt="logo"
          width={300}
          height={200} // Ajusta el tamaño según sea necesario
        />
      </div>

      {/* Indicador de carga */}
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Cargando datos...</span>
      </div>

      {/* Texto "Cargando..." */}
      <h6 className="mt-3">Cargando datos...</h6>

      {/* Define la animación de zoom usando CSS */}
      <style >{`
        @keyframes zoomAnimation {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
