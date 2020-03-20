import { observable, action, computed } from 'mobx';
import { apiService } from '../services';
import history from '../helpers/history';
import SelectObject from '../models';
import ListUsuario from '../models';

export class UsuarioStore {

  @observable listEmpresas:SelectObject  = [];
  @observable listLocacion:SelectObject  = [];
  @observable listProveedor:SelectObject = [];
  @observable listZona:SelectObject      = [];

  @observable listUsuarios:ListUsuario      = [];
  @observable listPaginas                   = [];

  @observable errores   = undefined; 

  @observable empresa   = {value:1,label:"Translamex S.A de C.V"};
  @observable locacion  = {value:1,label:"Cancún"};
  @observable proveedor = {value:2,label:"DOLPHIN DISCOVERY"};
  @observable zona      = "";
  @observable firstName = "";
  @observable activo    = 1;
  @observable email     = "";
  @observable password  = "";
  @observable confirmPassword = "";
  @observable fcupon          = 0;
  @observable fnocupon        = 0;
  @observable admon           = 0;
  @observable cambiop         = 0;
  @observable buscar          = '';
  
  @action setBuscar(paramBuscar) {
    this.buscar =  paramBuscar;
  }

  @action setFCupon(paramFcupon) {
    this.fcupon =  paramFcupon;
  } 
  
  @action setFNOCupon(paramFNOcupon) {
    this.fnocupon =  paramFNOcupon;
  }
  
  @action setAdmon(paramAdmon) {
    this.admon =  paramAdmon;
  }
  
  @action setCambioP(paramCambiop) {
    this.cambiop =  paramCambiop;
  }
  
  @action setActivo(paramactivo) {
    this.activo = paramactivo;
  }

  @action setFirstName(paramFirstname) {
    this.firstName = paramFirstname;
  }

@action setEmail(paramEmail) {
  this.email = paramEmail;
}

@action setPassword(paramPassword) {
  this.password = paramPassword;
}

@action setConfirmPassword(paramConfirmPassword) {
  this.confirmPassword = paramConfirmPassword;
}

@action ListaUsuarios(pagina,search,empresa,locacion,proveedor) {
     
    this.listUsuarios = [];
    this.listPaginas  = [];

    return apiService.Usuario_GetAll(pagina,search,empresa,locacion,proveedor).then(
      respuesta => { 
          this.listUsuarios = respuesta.listaItems;
          this.listPaginas  = respuesta.paginas;
      },
      err => {
         this.errores      = err.toString();
         this.listUsuarios = [];
         this.listPaginas  = [];
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

 @action StoreUsuario(idusuario) {

 if (idusuario == undefined) {

  return apiService.Usuario_Insertar(this.firstName,this.activo,
                                     this.email,this.password,
                                     this.confirmPassword,this.empresa,
                                     this.locacion,this.proveedor,
                                     this.zona,this.fcupon,this.fnocupon,
                                     this.admon,this.cambiop).then(
    respuesta => { 
      history.push("/listuser");
    },
    err => {
       this.errores = err.toString();
  });

} else {
  // Edición
  return apiService.Usuariosditar(idusuario,this.firstName,this.activo,
                                  this.email,this.password,
                                  this.confirmPassword,this.empresa,
                                  this.locacion,this.proveedor,
                                  this.zona,this.fcupon,this.fnocupon,
                                  this.admon,this.cambiop).then(
respuesta => { 
  history.push("/listuser");
//console.log(respuesta);
},
err => {
this.errores = err.toString();
});

}

}

 @action ListaZonas() {
 
  this.listZona = [];
 return apiService.Usuario_Zonas().then(
    respuesta => { 
       this.listZona = respuesta;
    },
    err => {
       this.errores = err.toString();
       this.listZona = [];
  });
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

 @action resetInformation(){

  this.empresa   = {value:1,label:"Translamex S.A de C.V"};
  this.locacion  = {value:1,label:"Cancún"};
  this.proveedor      = {};
  this.listEmpresas   = [];
  this.listLocacion   = [];
  this.listProveedor  = [];
  this.listZona       = [];
  this.listUsuarios   = [];
  this.listPaginas    = [];
  this.errores        = undefined; 

  this.zona            = "";
  this.firstName       = "";
  this.activo          = 1;
  this.email           = "";
  this.password        = "";
  this.confirmPassword = "";
  this.fcupon          = 0;
  this.fnocupon        = 0;
  this.admon           = 0;
  this.cambiop         = 0;
  this.buscar          = "";

 }

 @action UsuarioByID(userid) {
      
  return apiService.UsuarioGetByID(userid).then(
     respuesta => {
       this.firstName       = respuesta.provusr_nombre;
       this.activo          = respuesta.provusr_activo;
       this.email           = respuesta.provusr_email;
       this.password        = respuesta.provusr_clave;
       this.confirmPassword = respuesta.provusr_clave;
       this.proveedor       = {value:respuesta.provusr_proveedorID,label:respuesta.proveedor_nombre};
       this.locacion        = {value:respuesta.provusr_locacionID,label:respuesta.locacion_name};
       this.empresa         = {value:respuesta.provusr_empresaID,label:respuesta.empresa_nombre};
       this.zona            = {value:respuesta.provusr_zonaID,label:respuesta.zona_nombre}
       this.fcupon          = respuesta.provusr_facturacupon;
       this.fnocupon        = respuesta.provusr_factura;
       this.admon           = respuesta.provusr_admon;
       this.cambiop         = respuesta.provusr_cambioprov;
        //console.log(respuesta);
     },
     err => {
          this.errores  = err.toString();
     });

}
    
}