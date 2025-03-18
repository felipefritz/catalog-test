import React from "react";
import { useFormik } from "formik";
import { Button, Form, Spinner } from "react-bootstrap";
import { FormProps } from "./props/Props";
import { CatalogSchema } from "./schemas/CatalogSchema";


const CatalogForm: React.FC<FormProps> = ({
  initialValues= {
    nombre: "",
    descripcion: "",
    items: []
  },
  loading,
  error,
  onSubmit,

}) => {

  const formInitialValues = {
    ...initialValues,
  };

  const formik: any = useFormik({
    initialValues: formInitialValues,
    validationSchema: CatalogSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          name="nombre"
          className='required'
          value={formik.values.nombre}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.name && !!formik.errors.nombre}
          placeholder="Ingrese el nombre"
          required
        />
        <Form.Control.Feedback type="invalid">{formik.errors.nombre}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formDescripcion">
        <Form.Label>Descripcion</Form.Label>
        <Form.Control
          type="text"
          name="descripcion"
          className='required'
          value={formik.values.descripcion}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.descripcion && !!formik.errors.descripcion}
          placeholder="Ingrese descripcion"
        />
        <Form.Control.Feedback type="invalid">{formik.errors.descripcion}</Form.Control.Feedback>
      </Form.Group>

      {error && <div className="text-danger">{error}</div>}

      <div className="d-flex justify-content-center">
        <Button
          variant="primary"
          type="submit"
          className="mt-3 bg-success btn btn-sm"
          disabled={loading}
        >
          {loading ? <Spinner animation="border" size="sm" /> : "Guardar"}
        </Button>
      </div>
    </Form>
  );
};

export default CatalogForm;
