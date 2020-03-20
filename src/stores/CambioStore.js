import { observable, action, computed } from 'mobx';
import SelectObject from '../models';
import { apiService } from '../services';
import { authData } from '../helpers';

export class CambioStore {

 @observable empresa   = {value:1,label:"Translamex S.A de C.V"};
 @observable locacion  = {value:1,label:"Cancún"};
 @observable proveedor = "";

 @observable listEmpresas:SelectObject  = [];
 @observable listLocacion:SelectObject  = [];
 @observable listProveedor:SelectObject = [];
 @observable errores                    = undefined; 
 @observable cambioFlag                 = false;

 @action setCambioFlag(paramdato) {
   this.cambioFlag = paramdato;
 }

 @action CambioProveedores() {

   this.cambioFlag = false; 

   return apiService.CambioProveedor(this.empresa.value,this.locacion.value,this.proveedor.value).then(
      user => {         
         const infodata = authData();
         const datos  = {"token":null,
                         "expiration":null,
                         "razonsocial":infodata.razonsocial,
                         "rfc":infodata.rfc,
                         "usuario":infodata.usuario,
                         "nombre":infodata.nombre,
                         "proveedorID":user.proveedorID,
                         "zonaID":user.zonaID,
                         "empresaID":user.empresaID,
                         "locacionID":user.locacionID,
                         "admon":infodata.admon,
                         "factura":infodata.factura,
                         "facturacupon":infodata.facturacupon,
                         "cambioprov":infodata.cambioprov,
                         "empresa":infodata.empresa,
                         "domicilio":user.domicilio,
                         "empresarfc":user.empresarfc,
                         "empresanombre":user.empresanombre };     
         //console.log("CAMIO RESP :" + user.razonsocial);
         localStorage.setItem('usrtrx', JSON.stringify(datos));
         this.cambioFlag = true;
      },
      err => {
        this.errores = err.toString();        
      });
}

 @action resetInformation() {
  this.empresa   = { value:1,label:"Translamex S.A de C.V" };
  this.locacion  = { value:1,label:"Cancún" };
  this.proveedor  = "";
  this.errores    = undefined; 
  this.cambioFlag = false; 
 }

 @action ListaProveedores(locacion,empresa) {
 
  this.listProveedor = [];
  return apiService.Usuario_Proveedor_By_Empresa_Locacion(locacion,empresa).then(
      respuesta => { 
         this.listProveedor = respuesta;
      },
      err => {
         this.errores = err.toString();
         this.listProveedor = [];
  });

 }

 @action ListaEmpresas() {
     
    this.listEmpresas =[];

    return apiService.Usuario_ListarEmpresas().then(
      respuesta => { 
         this.listEmpresas = respuesta;
      },
      err => {
         this.errores = err.toString();
         this.listEmpresas =[];
    });

  }

  @action ListaLocaciones() {

    this.listLocacion =[];
  
     return apiService.Usuario_ListarLocaciones().then(
        respuesta => { 
           this.listLocacion = respuesta;
        },
        err => {
           this.errores = err.toString();
           this.listLocacion =[];
      });
   }


}