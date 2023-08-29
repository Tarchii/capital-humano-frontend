import React from 'react'

const ViewDetailsObraSocial = ({employeeSelected}) => {
  return (
    <div>
    <p><strong>Nombre: </strong> {employeeSelected.nombre}</p>
    <p><strong>Domicilio: </strong> {employeeSelected.domicilio}</p>
    <p><strong>CUIT: </strong> {employeeSelected.cuit}</p>
    <p><strong>Telefono: </strong> {employeeSelected.telefono}</p>

</div>
  )
}

export default ViewDetailsObraSocial
