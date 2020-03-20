import { observable, action, computed } from 'mobx'
import { apiService } from '../services';
import Validacion from '../models';

export class ValidaStore {
  @observable serie                  = '';
  @observable serieID                = '';
  @observable clave                  = '';
  @observable listCupones:Validacion = [];
  @observable listValida:Validacion  = [];
  @observable cargacupon             = false;  
  @observable errores                = undefined;          

  @action setClave(pclave) {
    this.clave = pclave;
  }

  @action resetInformacion() {
    this.clave       = '';
    this.serie       = '';
    this.serieID     = '';
    this.listValida  = [];
    this.listCupones = [];
    this.cargacupon  = false;
    this.errores     = undefined;
  }

  @action addCupon(paramCupon) {
      if ( this.listValida.filter( (e) => e.resTourID === paramCupon.resTourID) == false) {
        this.listValida.push(paramCupon);
      }
  }

  @action deleteCupon(cuponid) {
     var index =  this.listValida.indexOf(cuponid);
     if (index > -1) { 
       //Make sure item is present in the array, without if condition, -n indexes will be considered from the end of the array.
       this.listValida.splice(index, 1);
     }
  }

  @computed get CuponesCount() {
    return this.listValida.length;
  }

  @computed get SumaCostos() {
    return this.listValida.reduce((total, cupon) => total + cupon.costo, 0);
  }

  @action BuscarCupon(proveedorid) {

    this.cargacupon = true;
    this.errores    = "";
  
    return apiService.ValidacionCupon(this.serie, 
                                      this.clave,
                                      this.serieID,
                                      proveedorid).then(
      respuesta => { 
         this.listCupones = respuesta;
         this.cargacupon = false;
      },
      err => {
         this.errores = err.toString();
         this.cargacupon = false;
    });

  }

  @action ValidaCupones() {

    return apiService.ValidarCupones(this.listValida).then(
       respuesta => {

           if (respuesta.toString() === '1') {
            this.errores     = "cuponvalidado";
            this.listValida  = [];
            this.listCupones = [];
           } else {
            this.errores = "Error al validar el cupón.";
           }         
         // console.log("Cupones Validados : " + respuesta);
       },
       err => {
         this.errores = err.toString();
       });

  }


}