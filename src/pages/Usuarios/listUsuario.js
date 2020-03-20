import React,{useEffect , useCallback} from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useStores } from '../../hooks/use-stores';
import Breadcrumb from '../../components/Breadcrumb';
import Pagination from '../../components/Pagination';
import history from '../../helpers/history';
import Select from 'react-select';
import './listUsuario.css';

const listUsuario = observer(({match}) => {

    const { usuarioStore } = useStores();    
   
    useEffect(() => {         
    if (match.params.pagina !== undefined) {
      usuarioStore.ListaUsuarios( parseInt( match.params.pagina) ,usuarioStore.buscar,
      usuarioStore.empresa === null ? 0 : usuarioStore.empresa.value,
      usuarioStore.locacion === null ? 0 : usuarioStore.locacion.value,
      usuarioStore.proveedor === null ? 0 :usuarioStore.proveedor.value);
    }      
    }, [match,usuarioStore]);


    const handleListaProveedor = (locacion,empresa) => {
      usuarioStore.ListaProveedores(locacion,empresa);
    }
        
    useEffect(() => {   
      
     usuarioStore.ListaEmpresas();      
     usuarioStore.ListaLocaciones();
     usuarioStore.ListaProveedores(1,
     1);
      
      usuarioStore.ListaUsuarios(1,"",1,1,0);      
    }, [usuarioStore]);
  
    const handleNuevoUsuario = () => {
      usuarioStore.resetInformation();
      history.push('/adduser', true);
    }

    const handleBuscar = () => {
      usuarioStore.ListaUsuarios(1,
                                 usuarioStore.buscar,
                                 usuarioStore.empresa === null ? 0 : usuarioStore.empresa.value,
                                 usuarioStore.locacion === null ? 0 : usuarioStore.locacion.value,
                                 usuarioStore.proveedor === null ? 0 :usuarioStore.proveedor.value); 
    }

    const handleBuscaEmail = (e) => {
      usuarioStore.setBuscar(e.target.value);
  }
    
    return (<div>
              <Breadcrumb titulo="Usuarios"/>
               <div className="container">
               <div className="row">         
                 <div className="col-sm-12 col-md-12">
                      <button type="button" className="btn btn-outline-info btn-sm float-left" onClick={handleNuevoUsuario}>
                        Agregar Usuario
                      </button>
                 </div>    
                 <div className="mainB">
                    <div className="empresa">
                    <Select options = {usuarioStore.listEmpresas} value = {usuarioStore.empresa} 
                    name = "empresa" 
                    value = {usuarioStore.empresa}                                   
                    onChange = {(opt, value) => {                                                                          
                     usuarioStore.empresa = opt;
                     handleListaProveedor(usuarioStore.locacion.value,opt.value);
                    }}/>
                    </div>
                    <div className="locacion">
                    <Select options={usuarioStore.listLocacion} value = {usuarioStore.locacion} 
                    onChange ={(opt, value) => { 
                      usuarioStore.proveedor = null; 
                      usuarioStore.locacion = opt;                                                                        
                      handleListaProveedor(opt.value,usuarioStore.empresa.value);
                    }} />
                    </div>
                    <div className="proveedor">
                    <Select options={usuarioStore.listProveedor} value ={usuarioStore.proveedor} 
                    onChange ={(opt, value) => {  
                      usuarioStore.proveedor = opt;                                    
                    }}/>
                    </div>
                    <div className="search">
                      <input type="text" 
                             className='form-control form-control-sm' 
                             placeholder="Introduzca email..."
                             value = {usuarioStore.buscar} onChange={handleBuscaEmail} />
                      
                    </div>
                    <div className="btnbuscar"> 
                    <button type="button" className="btn btn-info btn-sm" onClick={handleBuscar}>
                        Buscar
                      </button>
                    </div>
                 </div>  
                 <div className="col-12 col-sm-12 col-md-12 centra">
            
                 <table className="table table-sm table-hover table-bordered">
                   <thead>
                     <tr>
                       <th>Email</th>
                       <th>Nombre</th>
                       <th>Empresa</th>
                       <th>Locación</th>
                       <th>Zona</th>
                       <th>Proveedor</th>
                       <th>Activo</th>
                       <th></th>
                     </tr>
                   </thead>
                   <tbody>
                   {
                   usuarioStore.listUsuarios === null ? <tr><td colSpan='8' align='center'>No se encontraron usuarios</td></tr> : 
                usuarioStore.listUsuarios.map(item => 
                 <tr key={item.provusr_id}> 
                    <td>{item.provusr_email}</td>
                    <td>{item.provusr_nombre}</td>
                    <td>{item.empresa_nombre}</td>
                    <td>{item.locacion_name}</td>
                    <td>{item.zona_nombre}</td>
                    <td>{item.proveedor_nombre}</td>
                    <td align="center">{item.provusr_activo === 1 ? 'Sí':'No'}</td>
                    <td align="center">
                       <Link to={`/edituser/${item.provusr_id}`} title="Editar Usuario">
                          <i className="fa fa-edit"></i>
                       </Link>
                    </td>
                 </tr>)
              }                     
                   </tbody>
                   </table>
                    {
                      usuarioStore.listPaginas === null ? '' : 
                      <Pagination paginacion={usuarioStore.listPaginas.pages}
                                  direccion="listUser"/>
                    }                   
                  </div>
               </div> 
               </div>
            </div>);
  });
  
  export default listUsuario;