import React from 'react'
import axios from '../../config/axios';
import useGet from ".././../hooks/useGet";
import { Spin } from 'antd';

const AreaEmpleado = ({employeeSelected}) => {
    const [areas, loading, getAreas] = useGet(
        '/areas',
        axios
      );
    const [puestos, puestosLoading, getPuestos] = useGet(
        '/puestos',
        axios
      );

      return (
        <div className="areaList">
          {!loading && !puestosLoading ? (
            <ul>
              {(() => {
                const uniqueAreas = new Set();
                return employeeSelected.puestos.map((puestoId) => {
                  const areaId = puestos.puestos.find((p) => p._id === puestoId)?.area;
                  if (areaId && !uniqueAreas.has(areaId)) {
                    uniqueAreas.add(areaId);
                    const area = areas.areas.find((v) => v._id === areaId);
                    return (
                      <li key={area._id}>{area.nombre}</li>
                    );
                  }
                  return null;
                });
              })()}
            </ul>
          ) : (
            <Spin spinning={loading || puestosLoading} />
          )}
        </div>
      );
      
}

export default AreaEmpleado