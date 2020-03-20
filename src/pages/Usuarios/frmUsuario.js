import React,{ useEffect , useCallback} from 'react';
import { observer,useObserver } from 'mobx-react';
import { useStores } from '../../hooks/use-stores';
import SubBreadcrumb from '../../components/SubBreadcrumb';
import history from '../../helpers/history';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import './frmUsuario.css';

const frmUsuario = observer(({match}) => {
const { usuarioStore } = useStores();
    
const validationSchema = Yup.object().shape({
 zona:Yup.string().required('La zona es requerida'),
 empresa:Yup.string().required('La empresa es requerida'),
 locacion:Yup.string().required('La locación es requerida'),
 proveedor:Yup.string().nullable().required('El proveedor es requerido'),
 email: Yup.string().email('Email es invalido').required('Email es requerido'),
 password: Yup.string().min(6, 'Password debe ser al menor de 6 caracteres').required('Password es requerido'),
 confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Los passwords deben de ser iguales').required('Confirma Password es requerido'),
 firstName: Yup.string().required('Nombre es requerido'),
});

const handleCancelar = () => {
   history.push("/listuser");
}

const handleListaProveedor = (locacion,empresa) => {
  usuarioStore.ListaProveedores(locacion,empresa);
}  

const handleActivoChange = (e) => {
    usuarioStore.setActivo(e.target.value);
}

const handleFirstnameChange =(e) => {
  usuarioStore.setFirstName(e.target.value);
}

const handleFCuponChange = (e) => {
  usuarioStore.setFCupon(e.target.value);
}

const handlePassChange = (e) => {
 usuarioStore.setPassword(e.target.value) 
}

 const handlePassCkaChange = (e) => {
    usuarioStore.setConfirmPassword(e.target.value) 
 }

 const handleFNOCuponChange = (e) => {
    usuarioStore.setFNOCupon(e.target.value);
 }
 
 const handleAdmonChange = (e) =>{
     usuarioStore.setAdmon(e.target.value);
 }

 const handleCambioPChange = (e) => {
     usuarioStore.setCambioP(e.target.value);
 }
 const handleEmailChange=(e)=> {
     usuarioStore.setEmail(e.target.value);
 }

useEffect( () => {

  usuarioStore.resetInformation();
  
   if ( match.params.idusuario !== undefined ) {
      usuarioStore.UsuarioByID(match.params.idusuario);
   }
  
    usuarioStore.ListaEmpresas();
    usuarioStore.ListaLocaciones();
    usuarioStore.ListaProveedores(1,
                                    1);
    usuarioStore.ListaZonas();
    }, [usuarioStore,match.params.idusuario]);
   
   return (<div>
            <SubBreadcrumb titulo="Usuarios" 
                           subtitulo="Agregar Usuario" 
                            url="/listuser" />  
            <div className="row">
            <div className="centrado col-sm-4 col-md-4">
            <form onSubmit={ e => {
               e.preventDefault();

               let usuarioFormData = {
                  firstName:usuarioStore.firstName,
                  email:usuarioStore.email,
                  password:usuarioStore.password,
                  confirmPassword:usuarioStore.confirmPassword,
                  empresa:usuarioStore.empresa,
                  locacion:usuarioStore.locacion,
                  proveedor:usuarioStore.proveedor,
                  zona:usuarioStore.zona
               };

               validationSchema.validate(usuarioFormData).catch(function(err) {
                  alert(err.errors);
               });

               validationSchema.isValid(usuarioFormData).then(function(valid) {
                    
                    if (valid === true) {
                     usuarioStore.StoreUsuario(match.params.idusuario);
                    }
                });
              
             }}>
                <div className="form-group">
                   <label htmlFor="firstName"><strong>Nombre Completo</strong></label>
                   <input name="firstName" type="text" value={usuarioStore.firstName} 
                     className='form-control form-control-sm' onChange={handleFirstnameChange} />                        
                </div>
                <div className="form-group">
                    <label htmlFor="activo"><strong>Activo</strong></label>
                    <select name="activo" 
                            className="form-control form-control-sm" 
                            value={usuarioStore.activo} onChange={handleActivoChange}>
                        <option value="1">Sí</option>
                        <option value="0">No</option>
                    </select>                                                     
                </div>                        
                <div className="form-group">
                    <label htmlFor="email"><strong>Email</strong></label>
                    <input name="email" 
                           type="text" 
                           className='form-control form-control-sm' value={usuarioStore.email}
                           onChange={handleEmailChange} />                            
                </div>
                <div className="form-group">
                <label htmlFor="password"><strong>Password</strong></label>
                <input name="password" type="password" 
                       className='form-control form-control-sm' value={usuarioStore.password} 
                       onChange={handlePassChange} />
                </div>
                <div className="form-group">
                            <label htmlFor="confirmPassword"><strong>Confirma Password</strong></label>
                            <input name="confirmPassword" 
                                   type="password" 
                                   className='form-control form-control-sm'
                                   value={usuarioStore.confirmPassword} onChange={handlePassCkaChange} />
                        </div>
                        <div className="form-group">
                        <label htmlFor="empresa"><strong>Empresa</strong></label>
                            <Select options = {usuarioStore.listEmpresas} 
                                    name = "empresa" 
                                    value = {usuarioStore.empresa}                                   
                                    onChange = {(opt, value) => {                                                                          
                                     usuarioStore.empresa = opt;
                                    }}
                                    />
                        </div> 
                        <div className="form-group">
                        <label htmlFor="locacion"><strong>Locación</strong></label>
                            <Select options={usuarioStore.listLocacion} 
                                    name="locacion"
                                    value = {usuarioStore.locacion}                   
                                    onChange ={(opt, value) => { 
                                      usuarioStore.proveedor = null; 
                                      usuarioStore.locacion = opt;                                                                        
                                      handleListaProveedor(opt.value,usuarioStore.empresa.value);
                                    }} />
                        </div> 
                        <div className="form-group">
                        <label htmlFor="proveedor"><strong>Proveedor</strong></label>
                          <Select name="proveedor" 
                                  value ={usuarioStore.proveedor}
                                  options={usuarioStore.listProveedor} 
                                  onChange ={(opt, value) => {  
                                    usuarioStore.proveedor = opt;                                    
                                  }}/>
                        </div>
                        <div className="form-group">
                        <label htmlFor="zona"><strong>Zona</strong></label>
                          <Select name="zona" 
                                  value ={usuarioStore.zona}
                                  options={usuarioStore.listZona} 
                                  onChange ={(opt, value) => {  
                                    usuarioStore.zona = opt;                                    
                                  }}/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="fcupon"><strong>Visualizar la opción Factura Cupones</strong></label>
                          <select name="fcupon" 
                                 className="form-control form-control-sm selectw" 
                                 value={usuarioStore.fcupon} onChange={handleFCuponChange}>
                            <option value="1">Sí</option>
                            <option value="0">No</option>
                          </select>                                                     
                        </div>  
                        <div className="form-group">
                           <label htmlFor="fnocupon"><strong>Visualizar la opción Factura Proveedores</strong></label>
                           <select name="fnocupon" 
                                   className="form-control form-control-sm selectw"
                                   value={usuarioStore.fnocupon} onChange={handleFNOCuponChange}>
                             <option value="1">Sí</option>
                             <option value="0">No</option>
                           </select>                                                     
                        </div>  
                        <div className="form-group">
                           <label htmlFor="admon"><strong>El usuario es Administrador</strong></label>
                           <select name="admon" 
                                   className="form-control form-control-sm selectw"
                                   value={usuarioStore.admon} onChange={handleAdmonChange}>
                             <option value="1">Sí</option>
                             <option value="0">No</option>
                           </select>                                                     
                        </div>  
                        <div className="form-group">
                           <label htmlFor="cambiop"><strong>El usuario hará Cambio de Proveedor</strong></label>
                           <select name="cambiop" 
                                   className="form-control form-control-sm selectw"
                                   value={usuarioStore.cambiop} onChange={handleCambioPChange}>
                             <option value="1">Sí</option>
                             <option value="0">No</option>
                           </select>                                                     
                        </div>                                                                                                                                                            
                        <div className="form-group">
                            <button type="submit" 
                                    className="btn btn-primary btn-sm float-right">Agregar</button>
                            <button type="button" 
                                    className="btn btn-secondary btn-sm float-left"
                                    onClick={handleCancelar}>Cancelar</button>
                        </div>
            </form>
            </div>                                         
        </div>
   </div>);
});
export default frmUsuario;
  

  