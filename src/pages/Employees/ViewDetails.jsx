import React from 'react'
import ObraSocialEmpleado from './ObraSocialEmpleado'
import PuestosEmpleados from './PuestosEmpleados'
import AreaEmpleado from './AreaEmpleado'
import DepartamentoEmpleado from './DepartamentoEmpleado'

const ViewDetails = ({employeeSelected}) => {
  return (
    <div>
        <p><strong>Nombre: </strong> {employeeSelected.nombre}</p>
        <p><strong>Apellido: </strong> {employeeSelected.apellido}</p>
        <p><strong>Edad: </strong> {employeeSelected.edad}</p>
        <p><strong>Legajo: </strong> {employeeSelected.legajo}</p>
        <p><strong>Dni: </strong> {employeeSelected.dni}</p>
        <p><strong>Genero: </strong> {employeeSelected.genero}</p>
        <p><strong>Obra/s Sociale/s: </strong> </p>
        <ObraSocialEmpleado employeeSelected={employeeSelected}/>
        <p><strong>Puesto/s: </strong> </p>
        <PuestosEmpleados employeeSelected={employeeSelected}/>
        <p><strong>Área/s: </strong> </p>
        <AreaEmpleado employeeSelected={employeeSelected}/>
        {/* <p><strong>Departamento/s: </strong> </p>
        <DepartamentoEmpleado employeeSelected={employeeSelected}/> */}
    </div>
  )
}

export default ViewDetails