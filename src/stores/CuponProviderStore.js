import { observable, action } from 'mobx'
import { apiService } from '../services';
import FacturaCupon from '../models/FacturaCupon';
import {FechaEdicionYMD,formatDate} from '../helpers';
import  history  from '../helpers/history';

export class CuponProviderStore {
  
  @observable fechainicio = '';
  @observable fechafin    = '';

  @observable flagContrarecibo = false;
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
  @observable IEPS      = 0;
  @observable respuestaCheck = '';
  @observable saedFlag = false;
  @observable cargaListaFlag = false;

  @observable ArchivoPdf = 'Adjunta Archivo PDF';
  @observable ArchivoXml = 'Adjunta Archivo XML';

  @observable listadoCuponesProv:FacturaCupon = [] ;
  @observable errores                         = undefined;
  @observable listPaginas                     = [];

  @action setFlagContrarecibo(paramflag) {
    this.flagContrarecibo = paramflag;
  }

  @action setFechaInicio(paramfechainicio) {
    this.fechainicio = paramfechainicio;  
  }

  @action setFechaFin(paramfechafin) {
    this.fechafin = paramfechafin;  
  }

  @action setArchivoPdf(paramPDF) {
    this.ArchivoPdf = paramPDF;
  }

  @action setArchivoXml(paramXML) {
    this.ArchivoXml = paramXML;
  }

  @action setIEPS(paramIEPS) {
    this.IEPS = paramIEPS;
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
     (paramIVA == null) ? this.IVA = 0 : this.IVA = paramIVA;
  }

  @action setretIVA(paramretIVA) {
    this.retIVA = paramretIVA;
  }

  @action setTotalMXN(paramtotalmxn){
    this.TotalMXN = paramtotalmxn;
  }

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

@action resetFactura() {

  this.flagContrarecibo = false;
  this.fechainicio      = '';
  this.fechafin         = '';
  this.Serie            = '';
  this.Folio      = '';
  this.Subtotal   = 0;
  this.Total      = 0;
  this.Fecha      = '';
  this.Registro   = '';
  this.TC         = 0;
  this.TotalMXN   = 0;
  this.retIVA     = 0;
  this.IVA        = 0;
  this.Descuento  = 0;
  this.Moneda     = '';
  this.retISR     = 0;
  this.ISR        = 0;
  this.retOtros   = 0;
  this.Otros      = 0;
  this.UUID       = 0;
  this.IEPS       = 0;
  this.cargaListaFlag = false;
  this.saedFlag = false;
  this.ArchivoPdf = 'Adjunta Archivo PDF';
  this.ArchivoXml = 'Adjunta Archivo XML';
 }

 @action getContrarecibo(tipo){

   this.flagContrarecibo = false;
  
   return apiService.Contrarecibo(tipo,
                                  formatDate(this.fechainicio),
                                  formatDate(this.fechafin)).then(
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

 @action GetFacturaByID(facturaid) {

  this.saedFlag = false;

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
                },
                err => {
                  this.errores = err.toString();
                });
 }

 @action ListProveedorFacturas(pagina,busqueda,tipofactura) {

    this.cargaListaFlag = true;
  
    return apiService.CuponesFacturaGetList(pagina,
                                            busqueda,
                                            tipofactura).then(
       respuesta => { 
         this.listadoCuponesProv = respuesta.listaFacturas;
         this.listPaginas = respuesta.paginas;
         this.cargaListaFlag = false; 
       },
       err => {
         this.errores = err.toString();
         this.listPaginas = [];
         this.cargaListaFlag = false;
       });
  }

  @action ChekFactura(facturaid) {

    this.saedFlag = true;

   if (facturaid === undefined) {

          return apiService.CheckExistFactura(this.UUID,2).then(
            respuesta => { 
              this.respuestaCheck = respuesta.factura;

                if (this.respuestaCheck === "sinfactura" ) {
                    this.SaveFacturaProveedor();
                } else {
                  this.errores = "La factura ya fué registrada, favor de verificar.";    
                  this.saedFlag = false;
                }
            },
            err => {
              this.errores = err.toString();
              this.saedFlag = false;
            });

   } else {
     this.EditFacturaProveedor(facturaid);
   }


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
                                        2,
                                        2,
                                        1,
                                        1,
                                        0,
                                        facturaid).then(
        respuesta => { 
          history.push("/proveedor");
        },
        err => {
           this.errores = err.toString();
           this.saedFlag = false;
        });
      
  }


@action SaveFacturaProveedor() {

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
                                        2,
                                        2,
                                        1,
                                        1,
                                        0).then(
      respuesta => { 
        history.push("/proveedor");
      },
      err => {
         this.errores = err.toString();
         this.saedFlag = false;
      });
    
}


}