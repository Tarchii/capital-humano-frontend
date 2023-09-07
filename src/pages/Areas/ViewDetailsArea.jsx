import React from 'react'

const ViewDetailsArea = ({employeeSelected}) => {
  return (
    <div>
    <p><strong>Nombre: </strong> {employeeSelected.nombre}</p>
    <p><strong>Descripcion: </strong> {employeeSelected.descripcion}</p>

</div>
  )
}

export default ViewDetailsArea