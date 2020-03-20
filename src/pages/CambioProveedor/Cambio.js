import React,{useEffect} from 'react';
import { observer } from 'mobx-react';
import Breadcrumb from '../../components/Breadcrumb';
import { useStores } from '../../hooks/use-stores';
import Select from 'react-select';
import history from '../../helpers/history';
import * as Yup from 'yup';

import './Cambio.css';

const Cambio = observer(() => {

 const { cambioStore } = useStores();

 const validationSchema = Yup.object().shape({
    empresa:Yup.string().required('La empresa es requerida'),
    locacion:Yup.string().required('La locación es requerida'),
    proveedor:Yup.string().nullable().required('El proveedor es requerido')
 });
 
 const handleListaProveedor = (locacion,empresa) => {
   cambioStore.ListaProveedores(locacion,empresa);
 } 

 const handleSubmit = () => {
  cambioStore.CambioProveedores();    
 }

 useEffect( () => {
    cambioStore.resetInformation();       
    cambioStore.ListaEmpresas();
    cambioStore.ListaLocaciones();
    cambioStore.ListaProveedores(1,1);
 }, [cambioStore]);

return (<div>
        <Breadcrumb titulo="Cambio de Proveedor"/> 
        {
            cambioStore.errores !== undefined &&
            <div class="alert alert-danger" role="alert">
             { cambioStore.errores}  
            </div>
        }
        {
        cambioStore.cambioFlag &&
          <div class="alert alert-success" role="alert">
            Se realizó el cambio de proveedor.  
          </div>
        }
        <div className="row">
                <div className="centrado col-sm-4 col-md-4">
                    <form onSubmit={ e => {
                        e.preventDefault();
                        let usuarioFormData = {
                            empresa:cambioStore.empresa,
                            locacion:cambioStore.locacion,
                            proveedor:cambioStore.proveedor                           
                        };
                        validationSchema.validate(usuarioFormData).catch(function(err) {
                            alert(err.errors);
                        });
                        validationSchema.isValid(usuarioFormData).then(function(valid) {                    
                            if (valid === true) {
                                handleSubmit();
                            }
                        });
                         
                        }}>
                        <div className="form-group">
                        <label htmlFor="empresa"><strong>Empresa</strong></label>
                            <Select options = {cambioStore.listEmpresas} 
                                    name = "empresa" 
                                    value = {cambioStore.empresa}                                   
                                    onChange = {(opt, value) => {                                                                          
                                        cambioStore.empresa = opt;
                                        cambioStore.proveedor = null;
                                        cambioStore.setCambioFlag(false);
                                        handleListaProveedor(cambioStore.locacion.value,opt.value); 
                                    }}
                                    />
                        </div> 
                        <div className="form-group">
                        <label htmlFor="locacion"><strong>Locación</strong></label>
                        <Select options={cambioStore.listLocacion} 
                                name="locacion"
                                value = {cambioStore.locacion}                   
                                onChange ={(opt, value) => { 
                                        cambioStore.proveedor = null; 
                                        cambioStore.locacion = opt; 
                                        cambioStore.setCambioFlag(false);                                                                       
                                        handleListaProveedor(opt.value,cambioStore.empresa.value);
                                }} />
                        </div> 
                        <div className="form-group">
                        <label htmlFor="proveedor">
                              <strong>Proveedor</strong>
                        </label>
                        <Select name="proveedor" 
                                value ={cambioStore.proveedor}
                                options={cambioStore.listProveedor} 
                                onChange ={(opt, value) => {  
                                    cambioStore.proveedor = opt;
                                    cambioStore.setCambioFlag(false);                                    
                                }}/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-sm float-right">Realizar cambio</button>
                        </div>
                    </form>
                </div>
            </div>          
           </div>);

});

export default Cambio;