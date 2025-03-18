// Función para convertir URL de imagen a Base64
export const convertToBase64 = async (url: string) => {
  if (!url.startsWith("http")) {
    console.error(`URL inválida o no accesible: ${url}`);
    return null;
  }
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result); // Convierte el blob a base64
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  // Función para extraer el nombre del archivo
export const extractFilename = (path: string) => {
  return path.split('/').pop();
};

// Función para convertir archivos a base64
export const convertFileToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Función para convertir URLs a base64
export const convertUrlToBase64 = async (url: string) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error al convertir URL a base64:', error);
    return '';
  }
};
  
  // Función para formatear la fecha
  export const formatDate = (dateString: string) => {
    console.log(dateString);
    const [year, month, day] = dateString.split('-').map(Number);
    // Crear la fecha en la zona horaria local
    const date = new Date(year, month - 1, day);
    const daysOfWeek = [
      'domingo',
      'lunes',
      'martes',
      'miércoles',
      'jueves',
      'viernes',
      'sábado',
    ];
    const monthsOfYear = [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ];
    const dayName = daysOfWeek[date.getDay()];
    const dayNumber = date.getDate();
    const monthName = monthsOfYear[date.getMonth()];
    const yearStr = date.getFullYear();
  
    return `${dayName} ${dayNumber} de ${monthName} de ${yearStr}`;
  };
  