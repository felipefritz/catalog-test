import { FaFilePdf, FaFileWord, FaFileExcel, FaFileImage, FaFileAlt } from 'react-icons/fa';

export const getErrorMessages = (error: any | { data?: any, errors?: any }) => {
    try {
      // Si el error es un string que incluye "Error", parsearlo
      if (typeof error === "string" && error.includes("Error")) {
        const jsonString = error.split(": ", 2)[1]; // Extraer el JSON después del prefijo de estado
        const errorObj = JSON.parse(jsonString);
  
        // Si hay "details" en el objeto JSON, extraer los mensajes
        if (errorObj.details) {
          return Object.values(errorObj.details).flat();
        }
  
        // Si hay "errors" en el objeto JSON, extraer los mensajes
        if (errorObj.errors) {
          return Object.values(errorObj.errors).flat();
        }
      }
  
      // Si el error tiene "data.details", extraer los mensajes
      if (error?.data?.details) {
        return Object.values(error.data.details).flat();
      }
  
      // Si el error tiene "errors", extraer los mensajes
      if (error?.errors) {
        return Object.values(error.errors).flat();
      }
  
      // Si no se puede procesar el error, devolver mensaje genérico
      return ["Unknown error"];
    } catch (e) {
      // Si ocurre un error al parsear, devolver un mensaje de error
      return ["Error al procesar la respuesta del servidor"];
    }
  };
  

	export const downloadImage = async (url: string, filename: string) => {
		try {
			const response = await fetch(url.replace("/api", ""), {
				method: "GET",
				mode: "no-cors",
			});

			const blob = await response.blob();
			const blobUrl = window.URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = blobUrl;
			link.download = filename;

			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);

			window.URL.revokeObjectURL(blobUrl);
		} catch (error) {
			console.error("Error al descargar la imagen:", error);
		}
	};

export const flattenErrors = (errors: any, fieldPrefix = ''): string[] => {
		let allErrors: string[] = [];

		Object.keys(errors).forEach((key) => {
			const value = errors[key];
			const fieldPath = fieldPrefix ? `${fieldPrefix}.${key}` : key;

			if (typeof value === 'string') {
				allErrors.push(value);
			} else if (typeof value === 'object' && value !== null) {
				allErrors = [...allErrors, ...flattenErrors(value, fieldPath)];
			}
		});

		return allErrors;
	};

export    const getFileIcon = (fileType: string) => {
	switch (fileType?.toLowerCase()) {
		case 'pdf':
			return <FaFilePdf size={50} className="text-danger" />;
		case 'doc':
		case 'docx':
			return <FaFileWord size={50} className="text-primary" />;
		case 'xls':
		case 'xlsx':
			return <FaFileExcel size={50} className="text-success" />;
		case 'jpg':
		case 'jpeg':
		case 'png':
		case 'gif':
			return <FaFileImage size={50} className="text-warning" />;
		default:
			return <FaFileAlt size={50} className="text-secondary" />;
	}
};