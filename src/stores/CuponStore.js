import { observable, action,computed } from 'mobx'
import { apiService } from '../services';
import FacturaCupon from '../models/FacturaCupon';
import {Validacion,CuponPreview} from '../models';
import {formatDate,FechaEdicionYMD} from '../helpers';

import  history  from '../helpers/history';

export class CuponStore {

  @observable flagContrarecibo  = false;
  @observable fechainicio       = '';
  @observable fechafin          = '';
  @observable listaContrarecibo = [];

  @observable Serie     = '';
  @observable Folio     = '';
  @observable Subtotal  = 0;
  @observable Total     = 0;
  @observable Fecha     = '';
  @observable Registro  = '';
  @observable TC        = 0;
  @observable TotalMXN  = 0;
  @observable retIVA    = 0;
  @observable IVA       = 0;
  @observable Descuento = 0;
  @observable Moneda    = '';
  @observable retISR    = 0;
  @observable ISR       = 0;
  @observable retOtros  = 0;
  @observable Otros     = 0;
  @observable UUID      = 0;
  @observable IEPS       = 0;
  @observable flagcarga  = false;
  @observable monedaFlag = "";

  @observable ArchivoPdf  = 'Adjunta Archivo PDF';
  @observable ArchivoXml  = 'Adjunta Archivo XML';
  @observable cuponBuscar = '';
  @observable listadoCupones:FacturaCupon   = [];
  @observable listaPaginas                  = [];
  @observable errores                       = undefined;
  @observable arreglocupones:Validacion     = [];
  @observable cuponesValida:Validacion      = [];
  @observable listCuponPreview:CuponPreview = [];

  @observable saedFlag = false;
  @observable cargaListaFlag = false;

  @action setContrareciboFlag(paramFlag) {
    this.flagContrarecibo = paramFlag;
}

  @action setArchivoPDF(paramPDF) {
       this.ArchivoPdf = paramPDF;
  }

  @action setMonedaFLAG(parammonedaflag) {
   this.monedaFlag = parammonedaflag;
  }

  @action setFechaInicio(paramfechainicio) {
    this.fechainicio = paramfechainicio;  
  }

  @action setFechaFin(paramfechafin) {
    this.fechafin = paramfechafin;  
  }
   
  @action setArchivoXML(paramXML) {
      this.ArchivoXml = paramXML;
    }

    @action setIEPS(paramIEPS) {
      this.IEPS = paramIEPS;
    }

    @action setClaveBuscar(paramClaveBuscar) {
      this.cuponBuscar = paramClaveBuscar;
    }
    
    @action setUUID(paramUUID) {
      this.UUID = paramUUID;
    }

    @action setOtros(paramotros) {
      this.Otros = paramotros;
    }
    
    @action setOtrosret(paramotrosret) {
      this.retOtros = paramotrosret;
    }

    @action setISR(paramISR) {
      this.ISR = paramISR;
    }

    @action setretISR(paramretISR) {
      this.retISR = paramretISR;
    }

    @action setMoneda(parammoneda) {
      this.Moneda = parammoneda;
    }

    @action setDescuento(paramdescuento) {
      this.Descuento = paramdescuento;
    }

    @action setIVA(paramIVA) {
      this.IVA = paramIVA;
    }

    @action setretIVA(paramretIVA) {
      this.retIVA = paramretIVA;
    }

    @action setTotalMXN(paramtotalmxn){
      this.TotalMXN = paramtotalmxn;
    }s

    @action setTC(paramTC) {
     this.TC = paramTC;
    }

  @action setRegistro(paramregistro) {
   this.Registro = paramregistro;
  }

  @action setFecha(paramfecha) {
   this.Fecha = paramfecha;
  }

  @action setSerie(paramserie) {
   this.Serie = paramserie;
  }

  @action setFolio(paramfolio) {
   this.Folio = paramfolio;
  }
  
  @action setSubtotal(paramsub) {
    this.Subtotal = paramsub;
  }
    
  @action setTotal(paramtotal) {
    this.Total = paramtotal;
  }    

  @computed get CuentaListadoCupones() {
     
   if ( this.listadoCupones === null) {
    return 0
   } else {
    return this.listadoCupones.length;
   }  
  
  }

  @action getCuponesFactura(zona,factura) {
    
    this.cuponesValida = [];
    
    return apiService.Factura_CuponPreview(zona,factura).then(
      respuesta => {      
        respuesta.map(item=>  {          
          this.cuponesValida.push({"serie":item.serie,"rescode":item.res_code,
            "adultos":item.res_numadults,
            "menores":item.res_numchild,
            "costo":item.res_costototal,
            "montomxn":item.costomxn,
            "tour":item.tour_nameesp,
            "resTourID":item.res_tourid		
          });
        });
          
      },
      err => {
        this.errores = err.toString();
       });
  }

  @action resetFactura() {

    this.flagContrarecibo = false;
    this.saedFlag    = false;
    this.errores     = "";
    this.Serie       = '';
    this.Folio       = '';
    this.Subtotal    = 0;
    this.Total       = 0;
    this.Fecha       = '';
    this.Registro    = '';
    this.TC          = 0;
    this.TotalMXN    = 0;
    this.retIVA      = 0;
    this.IVA         = 0;
    this.Descuento   = 0;
    this.Moneda      = '';
    this.retISR      = 0;
    this.ISR         = 0;
    this.retOtros    = 0;
    this.Otros       = 0;
    this.UUID        = 0;
    this.IEPS        = 0;
    this.cuponBuscar = '';
    this.flagcarga   = false;
    this.cargaListaFlag = false;

    this.arreglocupones  = [];
    this.cuponesValida   = [];

    this.listadoCupones = [];
    this.listaPaginas   = [];

    this.ArchivoPdf = 'Adjunta Archivo PDF';
    this.ArchivoXml = 'Adjunta Archivo XML';

   }

   @action EditFacturaProveedor(facturaid) {

    var today = new Date();

    return apiService.CuponProviderEdit(this.UUID,
                                        this.ArchivoXml,
                                        this.ArchivoPdf,
                                        formatDate(today),
                                        FechaEdicionYMD(this.Fecha),                                        
                                        this.Serie,
                                        this.Folio,
                                        this.TC,
                                        this.Total,
                                        this.Moneda,
                                        0,
                                        this.Descuento,
                                        0,
                                        this.IVA,
                                        this.retIVA,
                                        this.ISR,
                                        this.retISR,
                                        this.IEPS,
                                        this.retOtros,
                                        this.Otros,
                                        1,0,facturaid).then(
      respuesta => { 
        // Cupones de la factura
        this.SaveCuponesFactura(facturaid);
      },
       err => {
          this.errores = err.toString();
      });
      
  }

   @action GetFacturaByID(facturaid,zonaid) {

    return apiService.GetCuponProviderByID(facturaid).then(
              respuesta => { 
                this.Serie     = respuesta[0].factura.facprov_factura;
                this.Folio     = respuesta[0].factura.facprov_facturanum;
                this.Registro  = respuesta[0].factura.facprov_fechaRegistro;
                this.Fecha     = respuesta[0].factura.facprov_fecha;      
                this.UUID      = respuesta[0].factura.facprov_UUID ;
                this.TC        = parseFloat(respuesta[0].factura.facprov_tipocambio).toFixed(2);
                this.Total     = parseFloat(respuesta[0].factura.facprov_montototal).toFixed(2);
                this.Moneda    = respuesta[0].factura.facprov_moneda;
                this.Descuento = parseFloat(respuesta[0].factura.facprov_descuento).toFixed(2);
                this.Subtotal  = parseFloat( respuesta[0].factura.facprov_subtotal).toFixed(2);
                this.IVA       = parseFloat(respuesta[0].factura.facprov_IVA).toFixed(2);
                this.retIVA    = parseFloat(respuesta[0].factura.facprov_retIVA).toFixed(2);
                this.IEPS      = parseFloat(respuesta[0].factura.facprov_IEPS).toFixed(2);
                this.ISR       = parseFloat(respuesta[0].factura.facprov_ISR).toFixed(2);
                this.retISR    = respuesta[0].factura.facprov_retISR;
                this.Otros       = respuesta[0].factura.facprov_otros;
                this.retOtros    = respuesta[0].factura.facprov_retotros;
                this.ArchivoPdf  = respuesta[0].factura.facprov_pdf;
                this.ArchivoXml  = respuesta[0].factura.facprov_xml;

                this.getCuponesFactura(zonaid,facturaid);
              },
              err => {
                this.errores = err.toString();
              });
}

@action ChkExisteFactura(facturaid) {

  this.saedFlag = true;

  if (facturaid === undefined) {

    return apiService.CheckExistFactura(this.UUID,1).then(
      respuesta => { 
        this.respuestaCheck = respuesta.factura;

          if (this.respuestaCheck === "sinfactura" ) {
              this.SaveFactura();
          } else {
            this.saedFlag = false;
            this.errores = "La factura ya fue registrada,favor de verificar";    
          }
      },
      err => {
        this.saedFlag = false;
        this.errores = err.toString();
      });

  } else {
    this.EditFacturaProveedor(facturaid);
  }

  }


  @action SaveFactura() {

    var today = new Date();
  
    return apiService.CuponProviderInsert(this.UUID,
                                          this.ArchivoXml,
                                          this.ArchivoPdf,
                                          formatDate(today.toString()),
                                          this.Fecha,                                        
                                          this.Serie,
                                          this.Folio,
                                          this.TC,
                                          this.Total,
                                          this.Moneda,
                                          0,
                                          this.Descuento,
                                          0,
                                          this.IVA,
                                          this.retIVA,
                                          this.ISR,
                                          this.retISR,
                                          this.IEPS,
                                          this.retOtros,
                                          this.Otros,
                                          1,0).then(
        respuesta => {
          //obtengo el id de la factura
          var idresponse =  respuesta.facprov_id;          
          this.SaveCuponesFactura(respuesta);
        },
        err => {
           this.errores = err.toString();
           this.saedFlag = false;
        });
      
  }

@action SaveCuponesFactura(facturaid){
  
   return apiService.Cupon_Agregar_CuponesSeleccionados(facturaid,
                                                        this.cuponesValida).then(
      respuesta => { 
         history.push("/listcupon");
         this.saedFlag = false;
      },
      err => {
         this.errores = err.toString();
         this.saedFlag = false;
      }
   );
   
}


@action getContrarecibo(tipo){

  this.flagContrarecibo = false;
  
  return apiService.Contrarecibo(tipo,formatDate(this.fechainicio),formatDate(this.fechafin)).then(
     respuesta => {       
       if (respuesta.length !== 0) {
         this.listaContrarecibo = respuesta;
         this.flagContrarecibo  = true;
        } else {
         this.listaContrarecibo = [];
         this.flagContrarecibo  = true;
        }
     },
     err => {
        this.errores = err.toString();
        this.flagContrarecibo = false;
     }
  );
  
}


@action ListCupones(pagina,busqueda,tipofactura) {
  
  this.cargaListaFlag = true;

  return apiService.CuponesFacturaGetList(pagina,
                                          busqueda,
                                          tipofactura).then(
        respuesta => {           
          this.listadoCupones = respuesta.listaFacturas;
          this.listaPaginas   = respuesta.paginas;
          this.cargaListaFlag = false;
        },
        err => {          
          this.errores = err.toString();
          this.cargaListaFlag = false;
        }
     );
  }

  @action BuscarCupones() {

    this.flagcarga = true;

    return apiService.Cupon_BuscaCuponValidado("",this.cuponBuscar,"").then(
        respuesta => { 
          this.arreglocupones = respuesta;
          this.flagcarga = false;
        },
        err => {
          this.errores = err.toString();
          this.flagcarga = false;
    });

  }

  @action getCuponPreview(zona,factura) {
    
    this.flagcarga = true;
    this.listCuponPreview = [];

    return apiService.Factura_CuponPreview(zona,factura).then(
      respuesta => { 
        this.listCuponPreview = respuesta;
        this.flagcarga = false;
      },
      err => {
        this.errores = err.toString();
        this.flagcarga = false;
  });
  }

  @action addCupon(paramCupon) {
    if ( this.cuponesValida.filter( (e) => e.resTourID === paramCupon.resTourID) == false) {
      this.cuponesValida.push(paramCupon);
    }
  }

  @action deleteCupon(cuponid) {
    var index =  this.cuponesValida.indexOf(cuponid);
    if (index > -1) { 
      //Make sure item is present in the array, without if condition, -n indexes will be considered from the end of the array.
      this.cuponesValida.splice(index, 1);
    }
  }

  @computed get CuponesCount() {
   return this.cuponesValida.length;
  }

  @computed get SumaCostos() {
   return this.cuponesValida.reduce((total, cupon) => total + cupon.costo, 0);
  }

  @computed get SumaCostosMXN() {
    return this.cuponesValida.reduce((total, cupon) => total + cupon.montomxn, 0);
  }

  //Funcion para hacer la resta entre el monto total de la factura
  // y el monto total de los cupones seleccionados
  @computed get SumaCostosMXN2() {
     return this.Total > 0 && this.cuponesValida.length > 0  ? 
     this.Total - this.cuponesValida.reduce((total, cupon) => total + cupon.montomxn, 0)  :0;
  }
  
  @computed get SumaCostosUSD() {
    return this.Total > 0 && this.cuponesValida.length > 0  ? 
    this.Total - this.cuponesValida.reduce((total, cupon) => total + cupon.costo, 0)  :0;
 }

 @computed get SumCuponesMXN() {
   return this.listCuponPreview.reduce((total, cupon) => total + cupon.costomxn, 0);
 }

 @computed get SumCuponesUSD() {
  return this.listCuponPreview.reduce((total, cupon) => total + cupon.res_costototal, 0);
}

}

