import React from 'react'

const VerDetallesPuestos = ({employeeSelected}) => {
  return (
    <div>
    <p><strong>Nombre: </strong> {employeeSelected.nombre}</p>
    <p><strong>Descripcion: </strong> {employeeSelected.descripcion}</p>
    <p><strong>Sueldo: </strong> {employeeSelected.sueldoBase}</p>
    <p><strong>Inicio: </strong> {employeeSelected.inicio}</p>

</div>
  )
}

export default VerDetallesPuestos