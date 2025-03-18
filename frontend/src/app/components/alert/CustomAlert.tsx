import { FC } from 'react'
import { Alert } from 'react-bootstrap'

interface CustomAlertProps {
  type: 'success' | 'danger' | 'warning' | 'info'
  title: string
  message: string
  children?: any | null
}

const CustomAlert: FC<CustomAlertProps> = ({ type, title, message, children }) => {
  return (
    <Alert variant={type} className="d-flex align-items-center">
      <div className="d-flex align-items-center">
        {type === 'danger' && <i className="fas fa-exclamation-circle me-2 text-danger"></i>}
        {type === 'success' && <i className="fas fa-check-circle me-2 text-success"></i>}
        {type === 'warning' && <i className="fas fa-exclamation-triangle me-2 text-warning"></i>}
        {type === 'info' && <i className="fas fa-info-circle me-2 text-info"></i>}
      </div>
      <div>
        <h4 className="alert-heading">{title}</h4>
        <p>{message}</p>
        {children}
      </div>
    </Alert>
  )
}

export default CustomAlert
