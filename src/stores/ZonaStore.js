import { observable, action } from 'mobx'
import { apiService } from '../services';
import ZonaI from '../models';
import ListadoZonaI from '../models';
import  history  from '../helpers/history';

export class ZonaStore {

 @observable zontc_nombre         = '';
 @observable zontc_activo         = 1;
 @observable zontc_empresaID      = 0;
 @observable dato: ZonaI          = [];
 @observable listado:ListadoZonaI = [];
 @observable errores              = undefined;

 @action setZonaNombre(nombre) {
   this.zontc_nombre = nombre;
 }

 @action setZonaActivo(activo) {
   this.zontc_activo = activo;
 }

 @action setZonaEmpresaID(empresaID) {
   this.zontc_empresaID = empresaID;
 }

 @action SaveZona(zonaid) {   

   if (zonaid !== undefined) {

      // ----------------------------------------------------
      // Edita Zona
      // ------------------------------------------------------
      return apiService.ZonasEditar(zonaid,
                                    this.zontc_nombre,
                                    this.zontc_activo).then(
        respuesta => {
          history.push("/listazonas");
        },
        err => {
          this.errores  = err.toString();
        });

   } else {

    // Guarda Zona
        return apiService.ZonasInsertar(this.zontc_nombre,
                                    this.zontc_activo,1).then(
             respuesta => {
                           history.push("/listazonas");
              },
              err => {
                this.errores  = err.toString();
              });
   }

 }

 @action ListadoZona() {
   return apiService.GetListadoZonas().then(
      respuesta => { 
        this.listado = respuesta[0].zonaTC;
      },
      err => {
        this.errores = err.toString();
   });
 }

 @action GetZonaByID(zonaid) {

   return apiService.ZonasByID(zonaid).then(
      respuesta => {
         this.zontc_nombre = respuesta.zontc_nombre;
         this.zontc_activo = respuesta.zontc_activo;
   },
   err => {
         this.errores  = err.toString();
   });

 }
 
 
}