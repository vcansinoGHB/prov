import React,{useEffect} from 'react'
import { observer } from 'mobx-react'
import { useStores } from '../../hooks/use-stores';
import SubBreadcrumb from '../../components/SubBreadcrumb';


const Zona = observer(({match}) => {

  const { zonastore } = useStores();
  
  useEffect(() => {

    if ( match.params.zonaid !== undefined ) {
       zonastore.GetZonaByID(match.params.zonaid);
    }
    
  }, [zonastore,match.params.zonaid]);

  
  const handleZonaChange = (e) => {
    zonastore.setZonaNombre(e.target.value);
  };

  const handleActivoChange = (e) => {
     zonastore.setZonaActivo(e.target.value);
  }

  return (<div>
    <SubBreadcrumb titulo="Zona Tipo de Cambio" 
                           subtitulo="Agregar Zona" 
                            url="/listazonas" />  
           <form onSubmit={ e => {
                    zonastore.SaveZona(match.params.zonaid);
                    e.preventDefault();
                }}>
               <div className="form-group row">
                  <label htmlFor="zona" className="col-sm-2 col-form-label">Zona</label>
                  <div className="col-sm-10">
                    <input type="text" 
                           className="form-control" 
                           id="zona" 
                           placeholder="Zona"
                           value={zonastore.zontc_nombre}
                           onChange={handleZonaChange} required/>
                  </div>
               </div>
               <div className="form-group row">
                  <label htmlFor="activo" className="col-sm-2 col-form-label">Activo</label>
                  <div className="col-sm-10">
                    <select id="activo" className="form-control" value={zonastore.zontc_activo} onChange={handleActivoChange}>
                      <option value="1">Activo</option>
                      <option value="0">No Activo</option>
                    </select>
                  </div>
               </div>  
               <div className="form-group row">
                   <div className="col-sm-12">
                       <button type="submit" className="btn btn-primary float-right">Aceptar</button>
                   </div>
               </div>             
           </form> 
          </div>);
});

export default Zona;
