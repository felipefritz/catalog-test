import Swal from "sweetalert2";


export const handleDelete = async (elementTitle: string, row: any, deleteAction: any) => {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "¡No podrás revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    allowOutsideClick: false,
  }).then(async (result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Eliminando...',
        text: 'Por favor, espera.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      try {
        console.log(row.id);
        await deleteAction(row.id).unwrap();

        Swal.fire({
          icon: "success",
          title: "¡Eliminado!",
          text: `${elementTitle} ha sido eliminado.`,
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.log(error);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: `No se pudo eliminar el ${elementTitle}`,
          confirmButtonText: "OK",
        });
      }
    }
  });
};
