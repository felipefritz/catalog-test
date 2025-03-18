
export interface FormProps {
    initialValues?: any;
    loading: boolean;
    error?: string | null;  
    handleClosed?: boolean | any
    onSubmit: (formData: {
      name: string;
      description?: string;
      created_by: number | any;
      updated_by: number;
    }) => void;
  }