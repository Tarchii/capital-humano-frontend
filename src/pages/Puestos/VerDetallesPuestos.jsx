import React from 'react'

const VerDetallesPuestos = ({puestoSelected}) => {
  return (
    <div>
    <p><strong>Nombre: </strong> {puestoSelected.nombre}</p>
    <p><strong>Descripcion: </strong> {puestoSelected.descripcion}</p>
    <p><strong>Área: </strong> {puestoSelected.area.nombre}</p>
    <p><strong>Sueldo: </strong> {puestoSelected.sueldoBase}</p>
    <p><strong>Inicio: </strong> {puestoSelected.inicio}</p>

</div>
  )
}

export default VerDetallesPuestos