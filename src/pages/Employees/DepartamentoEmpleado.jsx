import React from 'react'
import axios from '../../config/axios';
import useGet from ".././../hooks/useGet";
import { Spin } from 'antd';

const DepartamentoEmpleado = ({employeeSelected}) => {
    const [departamentos, loading, getDepartamentos] = useGet(
        '/departamentos',
        axios
      );
    const [areas, areasLoading, getAreas] = useGet(
        '/areas',
        axios
      );

      return (
        <div className="departamentoList">
          {!loading && !areasLoading ? (
            <ul>
              {(() => {
                const uniqueDepartamentos = new Set();
                return employeeSelected.areas.map((areaId) => {
                  const departamentoId = areas.areas.find((p) => p._id === areaId)?.departamento;
                  if (departamentoId && !uniqueDepartamentos.has(departamentoId)) {
                    uniqueDepartamentos.add(departamentoId);
                    const departamento = departamentos.departamentos.find((v) => v._id === departamentoId);
                    return (
                      <li key={departamento._id}>{departamento.nombre}</li>
                    );
                  }
                  return null;
                });
              })()}
            </ul>
          ) : (
            <Spin spinning={loading || areasLoading} />
          )}
        </div>
      );
      
}

export default DepartamentoEmpleado