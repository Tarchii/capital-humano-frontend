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
        <div className="employeeObrasSocialesList">
          {!loading ? (
            <ul>
              {employeeSelected.obrasSociales?.map((obraSocialId, index) => {
                const obraSocial = obrasSociales.obraSociales.find(
                  (obra) => obra._id === obraSocialId
                );
      
                return (
                  <li key={index}>
                    {obraSocial ? obraSocial.nombre : ''}
                  </li>
                );
              })}
            </ul>
          ) : (
            <Spin spinning={loading} />
          )}
        </div>
      );
      
}

export default ObraSocialEmpleado