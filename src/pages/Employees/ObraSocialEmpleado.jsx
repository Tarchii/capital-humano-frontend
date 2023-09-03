import React from 'react'
import axios from '../../config/axios';
import useGet from ".././../hooks/useGet";
import { Spin } from 'antd';
// import 'antd/dist/antd.css';

const ObraSocialEmpleado = ({employeeSelected}) => {

    const [obrasSociales, loading, getObrasSociales] = useGet(
        '/obraSocial',
        axios
      );


  return (
    <div className="checkboxColumn">

      {!loading ? (
       obrasSociales.obraSociales.map((rep, index) => {
          return (
            <div key={index} className="d-flex">
              <input
                type="checkbox"
                value={rep._id}
                checked={employeeSelected.obrasSociales?.includes(rep._id)}
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
  );
}

export default ObraSocialEmpleado