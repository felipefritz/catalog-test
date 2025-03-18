import * as Yup from "yup";

export const CatalogSchema = Yup.object().shape({
	nombre: Yup.string()
		.min(2, "El nombre es demasiado corto")
		.max(50, "El nombre es demasiado largo")
		.required("El nombre es requerido"),
	descripcion: Yup.string()
    .max(200, "La descripción es demasiado larga")
    .nullable(),
	items: Yup.array().nullable(),
});


