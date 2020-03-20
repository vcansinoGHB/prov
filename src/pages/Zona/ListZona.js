import React,{useEffect} from 'react';
import { observer } from 'mobx-react'
import { useStores } from '../../hooks/use-stores'
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import history from '../../helpers/history';

const ListZona = observer(() => {

  const { zonastore } = useStores();

  const handlenuevafactura = () => {
    
    history.push('/zona', true);
  }

  useEffect(() => { zonastore.ListadoZona(); }, [zonastore])
   
  return (<div> 
            <Breadcrumb titulo="Zona Tipo de Cambio"/>
              <button type="button" className="btn btn-outline-info btn-sm float-right" onClick={handlenuevafactura}>
                Nueva Zona
               </button><br/>
            Listado de Zonas
            <table className="table table-sm table-hover table-bordered">
            <thead>
             <tr>
               <th scope="col">#</th>
               <th scope="col">Zona</th>
               <th scope="col">Activo</th>
               <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
            { zonastore.listado.map(post => 
                <tr key={post.zontc_id}> 
                   <th scope="row">{post.zontc_id}</th>
                   <td>{post.zontc_nombre}</td>
                   <td>{post.zontc_activo}</td>
                   <td align="center">
                       <Link to={`/zonaedit/${post.zontc_id}`}>
                           <i className="fa fa-edit"></i>
                       </Link>
                    </td>
                   
                </tr>
             )}                    
            </tbody>
           </table>
     </div>);
});

export default ListZona;