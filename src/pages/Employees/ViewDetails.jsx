import React from 'react'
import ObraSocialEmpleado from './ObraSocialEmpleado'

const ViewDetails = ({employeeSelected}) => {
  return (
    <div>
        <p><strong>Nombre: </strong> {employeeSelected.nombre}</p>
        <p><strong>Apellido: </strong> {employeeSelected.apellido}</p>
        <p><strong>Edad: </strong> {employeeSelected.edad}</p>
        <p><strong>Legajo: </strong> {employeeSelected.legajo}</p>
        <p><strong>Dni: </strong> {employeeSelected.dni}</p>
        <p><strong>Genero: </strong> {employeeSelected.genero}</p>
        <p><strong>Obras Sociales: </strong> </p>
        <ObraSocialEmpleado employeeSelected={employeeSelected}/>
    </div>
  )
}

export default ViewDetails