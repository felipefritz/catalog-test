import React, { FC, useState } from "react";
import { PageLink, PageTitle } from "../../../../_metronic/layout/core";
import { Content } from "../../../../_metronic/layout/components/content";
import { KTIcon } from "../../../../_metronic/helpers";
import { Button, Alert } from "react-bootstrap";
import Loading from "../../loading";
import CustomAlert from "../../alert/CustomAlert";
import CustomModal from "../../modal/CustomModal";
import { getErrorMessageFromMutation } from "../../../services/utils/utils";
import { TableCommon } from "../../tables/generics/TableCommon";

interface GenericPageProps {
  resourceKey: any;
  resourceConfig: any;
}

const GenericResourcePage: FC<GenericPageProps> = ({ resourceKey,  resourceConfig}) => {
  const {
    TITLE,
    PLURAL_TITLE,
    PATH,
    FormComponent,
    useCreate,
    useUpdate,
    useList,
    useDelete,
    columns,
  } = resourceConfig[resourceKey];

  const pageBreadcrumbs: Array<PageLink> = [
    {
      title: TITLE,
      path: PATH,
      isSeparator: true,
      isActive: false,
    },
  ];

  const { data = [], isLoading, error } = useList(null);
  const [showModal, setShowModal] = useState(false);
  const [create, { isLoading: isLoadingCreate, error: errorCreate }] = useCreate();

  const handleCreate = async (values: object) => {
    try {
      console.log(values)
      await create(values).unwrap();
      setShowModal(false);
    } catch (err) {
      console.error(`Error creating ${TITLE}:`, err);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <CustomAlert
        type="danger"
        title="Error"
        message={`Ocurrió un error al cargar los datos: ${error}`}
      />
    );
  }

  return (
    <>
      <Content>
        <PageTitle breadcrumbs={pageBreadcrumbs}>{TITLE}</PageTitle>
        <div className="card mb-5">
          <div className="card-header border-0 pt-5">
            <h3 className="card-title align-items-start flex-column">
              <span className="card-label fw-bold fs-3 mb-1">
                <KTIcon iconName="chart-line" className="fs-2 me-2 text-success" />
                Listado de {PLURAL_TITLE}
              </span>
              <span className="text-muted mt-1 fw-semibold fs-7">
                Visualiza y gestiona los {PLURAL_TITLE}.
              </span>
            </h3>
            <div className="card-toolbar">
              <Button
                variant="success"
                className="btn btn-sm btn-light-success"
                onClick={() => setShowModal(true)}
              >
                <KTIcon iconName="plus" className="fs-3 me-2" />
                Agregar
              </Button>
            </div>
          </div>

          <div className="card-body py-3">
            <Alert variant="info" className="mb-5">
              <KTIcon iconName="info-circle" className="fs-3 me-2" />
              Puedes filtrar, ordenar y gestionar los datos desde este módulo.
            </Alert>
          </div>
        </div>

        <TableCommon
          useUpdate={useUpdate}
          useDelete={useDelete}
          FormComponent={FormComponent}
          data={data}
          columns={columns}
        />

        <CustomModal
          show={showModal}
          title={'Crear ' + TITLE}
          handleClose={() => setShowModal(false)}
        >
          <FormComponent
            loading={isLoadingCreate}
            error={getErrorMessageFromMutation(errorCreate) || null}
            onSubmit={handleCreate}
          />
        </CustomModal>
      </Content>
    </>
  );
};

export default GenericResourcePage;
