import React,{useEffect, useState} from 'react'
import { observer } from 'mobx-react';
import SubBreadcrumb from '../../components/SubBreadcrumb';
import { useStores } from '../../hooks/use-stores'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import './TipoCambio.css';

const TipoCambio = observer(({match}) => {

  const { tipocambioStore } = useStores();
  
  useEffect(() => {

    tipocambioStore.GetZonas();

     if ( match.params.tcid !== undefined ) {
       tipocambioStore.TipoCambioByID(match.params.tcid);
     }
    
  }, [tipocambioStore,match.params.tcid]);

  const handleZonaChange = (e) => {
    tipocambioStore.setZonaID(e.target.value);
  }

  const handleMontoChange = (e) => {
   tipocambioStore.setMonto(e.target.value);
  }

  const handleActivoChange = (e) => {
     tipocambioStore.setActivo(e.target.value);
  }

  const handleFechaInicio = (date) => {
    tipocambioStore.setFechaInicio(date);
  }

  const handleFechaFinal = (date) => {
    tipocambioStore.setFechaFin(date)
  }

  return (<div>
    <SubBreadcrumb titulo="Tipo de Cambio" 
                           subtitulo="Agregar Tipo Cambio" 
                            url="/listatc" />  
           <form onSubmit={ e => {
                  e.preventDefault();
                  tipocambioStore.SaveTipoCambio(match.params.tcid);                    
                }}>
               <div className="form-group row">
                   <label htmlFor="zonaid" className="col-sm-2 col-form-label">Zona Tipo Cambio</label>
                   <div className="col-sm-10">
                     <select id="zonaid" required className="form-control" 
                             value={tipocambioStore.zonaID} 
                             onChange={handleZonaChange}>
                               {tipocambioStore.listadozon.map(zone=>
                               <option value={zone.zontc_id} key={zone.zontc_id}>{zone.zontc_nombre}</option> 
                               )}
                     </select>
                   </div>
               </div>

               <div className="form-group row">
                  <label htmlFor="monto" className="col-sm-2 col-form-label">Monto</label>
                  <div className="col-sm-10">
                    <input type="text" 
                           className="form-control" 
                           id="monto" 
                           placeholder="Monto"
                           value={tipocambioStore.tc_monto}
                           onChange={handleMontoChange} required/>
                  </div>
               </div>
               <div className="form-group row">
                  <label htmlFor="dtinicio" className="col-sm-2 col-form-label">Fecha Inicio</label>
                  <div className="col-sm-10">
                     <DatePicker selected={tipocambioStore.tc_fechainicio}
                                 dateFormat="dd/MM/yyyy" 
                                 onChange={value => handleFechaInicio(value)} 
                                 className="datew" required/>
                  </div>
               </div> 
               <div className="form-group row">
                  <label htmlFor="dtfinal" className="col-sm-2 col-form-label">Fecha Final</label>
                  <div className="col-sm-10">
                       <DatePicker selected={tipocambioStore.tc_fechafin}
                                   dateFormat="dd/MM/yyyy" 
                                   onChange={value => handleFechaFinal(value)} 
                                   className="datew" />
                  </div>
               </div>                
               <div className="form-group row">
                  <label htmlFor="activo" className="col-sm-2 col-form-label">Activo</label>
                  <div className="col-sm-10">
                     <select id="activo" 
                             className="form-control" 
                             value={tipocambioStore.tc_activo} 
                             onChange={handleActivoChange}>
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

export default TipoCambio;
