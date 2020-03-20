import React,{useEffect} from 'react';
import { observer } from 'mobx-react'
import { useStores } from '../../hooks/use-stores'
import { Link } from 'react-router-dom';
import history from '../../helpers/history';
import Breadcrumb from '../../components/Breadcrumb';

const ListTipoCambio = observer(() => {

  const { tipocambioStore } = useStores();

  const handlenuevoTC=()=> {
   tipocambioStore.ResetInformacion();
   history.push('/tc', true);
  }

  useEffect(() => {
    tipocambioStore.Ac_ListadoTipoCambio();
  }, [tipocambioStore]);
   
  return (<div> 
            <Breadcrumb titulo="Tipo de Cambio"/> 
            <button type="button" className="btn btn-outline-info btn-sm float-right" onClick={handlenuevoTC}>
                Nuevo Tipo de Cambio
               </button><br/>
            Listado Tipo Cambio
            <table className="table table-sm table-hover table-bordered">
             <thead>
               <tr>
                   <th>Zona</th>
                   <th>Tipo Cambio</th>
                   <th>Fecha Inicial</th>
                   <th>Fecha Final</th>
                   <th>Activo</th>
                   <th></th>
               </tr>
             </thead>
             <tbody>
              { 
                tipocambioStore.listadotc.map(item => 
                 <tr key={item.tc_id}> 
                    <td>{item.zontc_nombre}</td>
                    <td>{item.tc_monto}</td>
                    <td>{item.tc_fechainicio}</td>
                    <td>{item.tc_fechafin}</td>
                    <td>{ item.tc_activo === 1 ? 'Sí' : 'No'}</td>
                    <td align="center">
                       <Link to={`/tcedit/${item.tc_id}`} title="Editar Tipo Cambio">
                          <i className="fa fa-edit"></i>
                       </Link>
                    </td>
                 </tr>)
              }                    
             </tbody>
            </table>
     </div>);
});

export default ListTipoCambio;