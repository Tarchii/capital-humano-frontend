import React from 'react'
import axios from '../../config/axios';
import useGet from ".././../hooks/useGet";
import { Spin } from 'antd';

const PuestosEmpleados = ({employeeSelected}) => {
    const [puestos, loading, getPuestos] = useGet(
        '/puestos',
        axios
      );

  return (
  //   <div className="checkboxColumn">

  //   {!loading ? (
  //    puestos.puestos.map((rep, index) => {
  //       return (
  //         <div key={index} className="d-flex">
  //           <input
  //             type="checkbox"
  //             value={rep._id}
  //             checked={employeeSelected.puestos?.includes(rep._id)}
  //           />
  //           <label title="Seleccione al menos una" className="ms-2">
  //             {rep.nombre}
  //           </label>
  //         </div>
  //       );
  //     })
  //   ) : (
  //     <Spin spinning={loading}/>
  //   )}
  // </div>
  <div className="employeePuestosList">
    {!loading ? (
      <ul>
        {employeeSelected && employeeSelected.puestos ? (
          employeeSelected.puestos.map((puestoId) => {
            const puesto = puestos.puestos.find((rep) => rep._id === puestoId);
            return (
              <li key={puesto._id}>
                {puesto.nombre}
              </li>
            );
          })
        ) : (
          <p>Empleado no seleccionado o sin puestos asignados.</p>
        )}
      </ul>
    ) : (
      <Spin spinning={loading} />
    )}
  </div>
  )
}

export default PuestosEmpleados