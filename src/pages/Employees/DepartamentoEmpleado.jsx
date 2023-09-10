import React from 'react'
import axios from '../../config/axios';
import useGet from ".././../hooks/useGet";
import { Spin } from 'antd';

const DepartamentoEmpleado = ({employeeSelected}) => {
    const [departamentos, departamentosLoading, getDepartamentos] = useGet(
        '/departamentos',
        axios
      );
    const [areas, areasLoading, getAreas] = useGet(
        '/areas',
        axios
      );

    const [puestos, puestosLoading, getPuestos] = useGet(
        '/puestos',
        axios
    );

    return (
      <div className="departamentosList">
        {!areasLoading && !puestosLoading && !departamentosLoading ? (
          <ul>
            {(() => {
              const uniqueAreas = new Set();
              return employeeSelected.puestos.map((puestoId) => {
                
                const areaId = puestos.puestos.find((p) => p._id === puestoId)?.area;
                if (areaId && !uniqueAreas.has(areaId)) {
                  uniqueAreas.add(areaId);
                  const area = areas.areas.find((v) => v._id === areaId);
                  const departamento =  departamentos.departamentos.find((c) => c._id === area.departamento);
                  return (
                    <li key={departamento._id}>{departamento.nombre}</li>
                  );
                }
                return null;
              });
            })()}
          </ul>
        ) : (
          <Spin spinning={departamentosLoading || puestosLoading || areasLoading} />
        )}
      </div>
    );
  };
  
export default DepartamentoEmpleado