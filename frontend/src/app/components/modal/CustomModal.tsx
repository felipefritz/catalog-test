import React, { FC } from 'react'
import { Modal, Button } from 'react-bootstrap'

type ModalFormProps = {
  show: boolean
  handleClose: () => void
  title: string
  children: React.ReactNode
}

const CustomModal: FC<ModalFormProps> = ({ show, handleClose, title, children }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  )
}

export default CustomModal
