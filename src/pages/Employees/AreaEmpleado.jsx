import React from 'react'
import axios from '../../config/axios';
import useGet from ".././../hooks/useGet";
import { Spin } from 'antd';

const AreaEmpleado = ({employeeSelected}) => {
    const [areas, loading, getAreas] = useGet(
        '/areas',
        axios
      );

  return (
    <div className="checkboxColumn">

    {!loading ? (
     areas.areas.map((rep, index) => {
        return (
          <div key={index} className="d-flex">
            <input
              type="checkbox"
              value={rep._id}
              checked={employeeSelected.areas?.includes(rep._id)}
            />
            <label title="Seleccione al menos una" className="ms-2">
              {rep.nombre}
            </label>
          </div>
        );
      })
    ) : (
      <Spin spinning={loading}/>
    )}
  </div>
  )
}

export default AreaEmpleado