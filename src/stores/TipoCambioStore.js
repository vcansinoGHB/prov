import { observable, action } from 'mobx'
import { apiService } from '../services';
import  history  from '../helpers/history';
import ListadoTipoCambio from '../models/TipoCambio';
import ListadoZonas from '../models/TipoCambio';
import {formatDate,FechaEdicion} from '../helpers';

export class TipoCambioStore {

    @observable zonaID          = 0;
    @observable tc_monto        = '';
    @observable tc_activo       = 1;
    @observable tc_fechainicio  = '';
    @observable tc_fechafin     = '';
    @observable empresaID       = 0;
    @observable listadotc:ListadoTipoCambio = [];
    @observable listadozon:ListadoZonas     = [] ;

    @action setZonaID(zonaid) {
      this.zonaID = zonaid;
    }

    @action setMonto(monto) {
        this.tc_monto = monto;
    }

    @action setActivo(activo) {
        this.tc_activo = activo;
    }

    @action setFechaInicio(fechainicio) {
        this.tc_fechainicio = fechainicio;
    }

    @action setFechaFin(fechafin) {
      this.tc_fechafin = fechafin;
    }

    @action setEmpresaID(empresaID) {
      this.empresaID = empresaID;
    }

    @action Ac_ListadoTipoCambio() {
        return apiService.TipoCambioListado().then(
          respuesta => { 
            this.listadotc = respuesta[0].tipoCambio;
        },
          err => {
            this.errores = err.toString();
        });
    }

    @action ResetInformacion(){
      this.empresaID = "";
      this.tc_fechafin = "";
      this.tc_fechainicio ="";
      this.tc_activo = 1;
      this.zonaID = "";
      this.tc_monto = 0;
    }

    @action GetZonas() {
       return apiService.TipoCambioGetZonas().then(
         respuesta => { 
            this.listadozon = respuesta;
         },
         err => {
            this.errores = err.toString();
         });
    }

    @action SaveTipoCambio(tcid) {

      let fechafinal;

      if ( this.tc_fechafin === "") {
        fechafinal = "";
      } else {
        fechafinal = formatDate(this.tc_fechafin);
      }

      if (tcid !== undefined) {

           return apiService.TipoCambioEditar(this.zonaID,
                                              this.tc_monto,
                                              this.tc_activo, 
                                              formatDate(this.tc_fechainicio),
                                              fechafinal,
                                              tcid).then(
                respuesta => {
                    history.push("/listatc");
                },
                err => {
                    this.errores  = err.toString();
           });

      } else {

           return apiService.TipoCambioInsertar(this.zonaID,
                                                this.tc_monto,
                                                this.tc_activo, 
                                                formatDate(this.tc_fechainicio),
                                                fechafinal).then(
                    respuesta => {
                        history.push("/listatc");
                    },
                    err => {
                        this.errores  = err.toString();
                    });
      }
  
    }

    @action TipoCambioByID(tcid) {
      
      return apiService.TipoCambioGetByID(tcid).then(
         respuesta => {
            this.zonaID          = respuesta.zontc_id;
            this.tc_monto        = respuesta.tc_monto;
            this.tc_activo       = respuesta.tc_activo;
            this.tc_fechainicio  = FechaEdicion(respuesta.tc_fechainicio);

            if (respuesta.tc_fechafin == "") {
              this.tc_fechafin = "";
            } else {
              this.tc_fechafin  =FechaEdicion(respuesta.tc_fechafin);
            }
            
            //this.empresaID      = empresaID;
            //console.log("Fecha Inicio: " + FechaEdicion(respuesta.tc_fechainicio) + "  FECHA final: "  + respuesta.tc_fechafin);
         },
         err => {
              this.errores  = err.toString();
         });

    }

}