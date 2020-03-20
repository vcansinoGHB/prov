import React,{useEffect,useState} from 'react'
import { observer } from 'mobx-react'
import { useStores } from '../../hooks/use-stores'
import { formatDate } from '../../helpers';
import SubBreadcrumb from '../../components/SubBreadcrumb';
import FileUpload from '../../components/FileUpload';
import axios from 'axios';

const FacturaProvider = observer(({match}) => {

  const {cuponproviderStore } = useStores();

  const [file,setFile]                = useState('');
  const [filename,setFilename]        = useState('Adjunta Archivo XML');

  const [filepdf,setFilepdf]          = useState('');
  const [filenamepdf,setFilenamepdf]  = useState('Adjunta Archivo PDF');


  const handleUploadingPDF = () => {
     
    if (filepdf !== '' && filepdf !== null && filepdf !== undefined) {
  
      let data = new FormData();
      data.append('file', filepdf);
  
      if (!cuponproviderStore.errores) {
        axios.post('https://devsia.translamex.com/json/Proveedores/uploading', data)
        .then(res => {
           console.log(res);
           console.log(res.data);
        });
   
      }
  
    }
        
    }
  
  const handleUploadingXML = () => {
       
     if (file !== '' && file !== null && file !== undefined) { 
     
       let data = new FormData();
       data.append('file', file);
  
       if (!cuponproviderStore.errores) {
         axios.post('https://devsia.translamex.com/json/Proveedores/uploading', data)
         .then(res => {
           console.log(res);
           console.log(res.data);
         });
       }
  
    }     
  }

  const xmlreadFunction = (archivo) => {

       var parser, xmlDoc;
        
        var reader = new FileReader();
        reader.onload = function(e) {
            var content = reader.result;
            //Here the content has been read successfuly
            //alert(content);
            var contenido = content.toString();
            parser        = new DOMParser();
            xmlDoc        = parser.parseFromString(contenido,"text/xml"); 

            if (xmlDoc.getElementsByTagName("cfdi:Comprobante")[0] !== undefined) {
   
            cuponproviderStore.setSerie(xmlDoc.getElementsByTagName("cfdi:Comprobante")[0].getAttribute("Serie"));
            cuponproviderStore.setFolio(xmlDoc.getElementsByTagName("cfdi:Comprobante")[0].getAttribute("Folio"));
            cuponproviderStore.setSubtotal(xmlDoc.getElementsByTagName("cfdi:Comprobante")[0].getAttribute("SubTotal"));
            cuponproviderStore.setTotal(xmlDoc.getElementsByTagName("cfdi:Comprobante")[0].getAttribute("Total"));
            cuponproviderStore.setFecha(formatDate(xmlDoc.getElementsByTagName("cfdi:Comprobante")[0].getAttribute("Fecha")));
            cuponproviderStore.setMoneda(xmlDoc.getElementsByTagName("cfdi:Comprobante")[0].getAttribute("Moneda"));
   
            
          if (xmlDoc.getElementsByTagName("cfdi:Impuestos")[0].childNodes[0].childNodes[0] !== undefined) {
              if ( xmlDoc.getElementsByTagName("cfdi:Impuestos")[0].childNodes[0].childNodes[0].getAttribute("Impuesto").toString() === '002') {
                cuponproviderStore.setIVA(xmlDoc.getElementsByTagName("cfdi:Impuestos")[0].childNodes[0].childNodes[0].getAttribute("Importe"));
              }  
           }
   
            // SE agrega el IVA clave 002
       if (xmlDoc.getElementsByTagName("cfdi:Impuestos")[0].childNodes[1]!== undefined){
       if (xmlDoc.getElementsByTagName("cfdi:Impuestos")[0].childNodes[1].childNodes[1] !== undefined) {
        //console.log( xmlDoc.getElementsByTagName("cfdi:Impuestos")[0].childNodes[1].childNodes[1].getAttribute("Impuesto").toString());
         if ( xmlDoc.getElementsByTagName("cfdi:Impuestos")[0].childNodes[1].childNodes[1].getAttribute("Impuesto").toString() === '002') {
          cuponproviderStore.setIVA(xmlDoc.getElementsByTagName("cfdi:Impuestos")[0].childNodes[1].childNodes[1].getAttribute("Importe"));
         }  
       }
     }
            
            //console.log("informacion: " + xmlDoc.getElementsByTagName("cfdi:Impuestos")[0].childNodes[0].childNodes[0].getAttribute("Impuesto") );
             // SE agrega el IVA clave 002
           // if ( xmlDoc.getElementsByTagName("cfdi:Impuestos")[0].childNodes[0].childNodes[0].getAttribute("Impuesto").toString() === '002') {
             // cuponproviderStore.setIVA(xmlDoc.getElementsByTagName("cfdi:Impuestos")[0].childNodes[0].childNodes[0].getAttribute("Importe"));
            //}
            
            //cuponproviderStore.setUUID(xmlDoc.getElementsByTagName("cfdi:Complemento")[0].childNodes[0].getAttribute("UUID") );
            if (xmlDoc.getElementsByTagName("tfd:TimbreFiscalDigital")[0] !== undefined) {
              cuponproviderStore.setUUID( xmlDoc.getElementsByTagName("tfd:TimbreFiscalDigital")[0].getAttribute("UUID") );
            }

          } else {
            cuponproviderStore.errores = "Se encontró un error al leer el xml de la factura.";
  
          }
        }
        reader.readAsText(archivo);        
    }

    useEffect(() => {

      if ( match.params.facturaid !== undefined ) {
        cuponproviderStore.GetFacturaByID(match.params.facturaid);
      }

    }, [match.params.facturaid,cuponproviderStore]);

    useEffect(() => {

      if (file !== "") {
        xmlreadFunction(file);
      }

   }, [file,xmlreadFunction]);
     
   const handleOnChangeFileXML = (e) => {

     setFile(e.target.files[0]);
     setFilename(e.target.files[0].name);

     cuponproviderStore.setArchivoXml(e.target.files[0].name);
   }

   const handleOnChangeFilePDF = (e) => {

     setFilepdf(e.target.files[0]);
     setFilenamepdf(e.target.files[0].name);

     cuponproviderStore.setArchivoPdf(e.target.files[0].name);
   }

   const descargarXML = () => {

     fetch('https://devsia.translamex.com/json/Proveedores/getArchivo?filename=' +cuponproviderStore.ArchivoXml )
      .then((response) => response.blob())
        .then((blob) => {                
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', cuponproviderStore.ArchivoXml);  // 3. Append to html page
                document.body.appendChild(link);  // 4. Force download
                link.click();  // 5. Clean up and remove the link
                link.parentNode.removeChild(link);  
          });
   }

   const descargarPDF = () => {    
    fetch('https://devsia.translamex.com/json/Proveedores/getArchivo?filename=' + cuponproviderStore.ArchivoPdf )
    .then((response) => response.blob())
      .then((blob) => {                
              const url = window.URL.createObjectURL(new Blob([blob]));
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', cuponproviderStore.ArchivoPdf);  // 3. Append to html page
              document.body.appendChild(link);  // 4. Force download
              link.click();  // 5. Clean up and remove the link
              link.parentNode.removeChild(link);  
        });
   }

   return (<div>
                <SubBreadcrumb titulo="Factura Proveedor" 
                               subtitulo={match.params.facturaid === undefined ? "Agregar Factura" : "Editar Factura"} 
                               url="/proveedor"/>
            {
              cuponproviderStore.errores ?
              <div className="alert alert-danger" role="alert">
               {cuponproviderStore.errores}
              </div>
              : ""
            }                               
                <form onSubmit={ e => {
                  e.preventDefault();
                  cuponproviderStore.ChekFactura(match.params.facturaid);
                  handleUploadingPDF();
                  handleUploadingXML();                    
                }}>  
                   <div className="row">            
                     <div className="col-md-5">
                      <FileUpload tipo=".xml" onChangeFile={handleOnChangeFileXML} nombreArchivo={cuponproviderStore.ArchivoXml} />
                     </div>
                     <div className="col-md-2">
                       {
                         match.params.facturaid !== undefined ?
                         <button type="button" 
                                 className="btn btn-outline-info btn-sm float-right" 
                                 onClick={descargarXML}>Descargar XML</button>
                          : ""   
                       }
                     </div>
                   </div>
                  <div className="row">
                      <div className="col-md-5 mt-2">
                         <FileUpload tipo=".pdf" onChangeFile={handleOnChangeFilePDF} 
                                     nombreArchivo={cuponproviderStore.ArchivoPdf} />
                      </div>
                      <div className="col-md-2">
                        {
                          match.params.facturaid !== undefined ?
                          <button type="button" 
                                  className="btn btn-outline-info btn-sm float-right" 
                                  onClick={descargarPDF}>Descargar PDF</button>
                        : ""   
                        }
                     </div>

                   </div>
                   <div className="row">
                  <div className="col-md-3 mb-3">
                    <label htmlFor="serie">Serie</label> 
                <input type="text" className="form-control form-control-sm" 
                       id="serie" 
                       placeholder="Serie" readOnly value={cuponproviderStore.Serie}/>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="folio">Folio</label> 
                <input type="text" 
                       className="form-control form-control-sm" 
                       id="folio" placeholder="Folio" readOnly value={cuponproviderStore.Folio}/>
              </div>
            <div className="col-md-3 mb-3">
                <label htmlFor="subtotal">SubTotal</label>
                <input type="text" 
                       className="form-control form-control-sm" 
                       id="subtotal" 
                       placeholder="Subtotal" readOnly value={cuponproviderStore.Subtotal} />
            </div>
            <div className="col-md-3 mb-3">
                <label htmlFor="total">Total</label>
                <input type="text" 
                       className="form-control form-control-sm" 
                       id="total" 
                       placeholder="Total" readOnly value={cuponproviderStore.Total}/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 mb-3">
                <label htmlFor="fecha">Fecha</label> 
                <input type="text" className="form-control form-control-sm" 
                       id="fecha" 
                       placeholder="Fecha" readOnly value={cuponproviderStore.Fecha}/>
            </div>
            <div className="col-md-3 mb-3">
               <label htmlFor="registro">Registro</label> 
               <input type="text" 
                      className="form-control form-control-sm" 
                      id="registro" placeholder="Registro" readOnly value={cuponproviderStore.Registro}/>
            </div>
            <div className="col-md-3 mb-3">
                <label htmlFor="tc">T.C.</label>
                <input type="text" 
                       className="form-control form-control-sm" 
                       id="tc" 
                       placeholder="Tipo de Cambio" readOnly value={cuponproviderStore.TC} />
            </div>
            <div className="col-md-3 mb-3">
                <label htmlFor="totalmxn">Total MXN</label>
                <input type="text" 
                       className="form-control form-control-sm" 
                       id="totalmxn" 
                       placeholder="Total MXN" readOnly value={cuponproviderStore.TotalMXN}/>
            </div>
          </div>   
          <div className="row">
            <div className="col-md-3 mb-3">
                <label htmlFor="retiva">Ret. IVA</label> 
                <input type="text" className="form-control form-control-sm" 
                       id="retiva" 
                       placeholder="Ret. IVA" readOnly value={cuponproviderStore.retIVA}/>
            </div>
            <div className="col-md-3 mb-3">
               <label htmlFor="iva">IVA</label> 
               <input type="text" 
                      className="form-control form-control-sm" 
                      id="iva" placeholder="IVA" readOnly value={cuponproviderStore.IVA}/>
            </div>
            <div className="col-md-3 mb-3">
                <label htmlFor="descuento">Descuento</label>
                <input type="text" 
                       className="form-control form-control-sm" 
                       id="descuento" 
                       placeholder="Descuento" readOnly value={cuponproviderStore.Descuento} />
            </div>
            <div className="col-md-3 mb-3">
                <label htmlFor="moneda">Moneda</label>
                <input type="text" 
                       className="form-control form-control-sm" 
                       id="moneda" 
                       placeholder="Moneda" readOnly value={cuponproviderStore.Moneda}/>
            </div>
          </div>                   
          <div className="row">
            <div className="col-md-3 mb-3">
                <label htmlFor="retisr">Ret. ISR</label> 
                <input type="text" className="form-control form-control-sm" 
                       id="retisr" 
                       placeholder="Ret. ISR" readOnly value={cuponproviderStore.retISR}/>
            </div>
            <div className="col-md-3 mb-3">
               <label htmlFor="isr">ISR</label> 
               <input type="text" 
                      className="form-control form-control-sm" 
                      id="isr" placeholder="ISR" readOnly value={cuponproviderStore.ISR}/>
            </div>
            <div className="col-md-3 mb-3">
                <label htmlFor="retotros">Ret. Otros</label>
                <input type="text" 
                       className="form-control form-control-sm" 
                       id="retotros" 
                       placeholder="Ret. Otros" readOnly value={cuponproviderStore.retOtros} />
            </div>
            <div className="col-md-3 mb-3">
                <label htmlFor="otros">Otros</label>
                <input type="text" 
                       className="form-control form-control-sm" 
                       id="otros" 
                       placeholder="Otros" readOnly value={cuponproviderStore.Otros}/>
            </div>
          </div>  
          <div className="row">
          <div className="col-md-9 mb-3">
                <label htmlFor="uuid">UUID</label> 
                <input type="text" className="form-control form-control-sm" 
                       id="uuid" 
                       placeholder="UUID" readOnly value={cuponproviderStore.UUID}/>
            </div>
          <div className="col-md-3 mb-3">
                <label htmlFor="ieps">IEPS</label> 
                <input type="text" className="form-control form-control-sm" 
                       id="ieps" 
                       placeholder="IEPS" readOnly value={cuponproviderStore.IEPS}/>
            </div>
          </div>
          <div className="row">
          <div className="col-sm-12 col-md-12">
              <button type="submit" className="btn btn-outline-info btn-sm float-right">
                  {
                   match.params.facturaid === undefined ? "Guardar Factura" : "Editar Factura"
                  }
                  {
                  cuponproviderStore.saedFlag === true ? 
                   <span className="spinner-border spinner-border-sm mr-1"></span> 
                  : ""
                 }
              </button>
             </div>  
          </div>
          </form>
      </div>);
})

export default FacturaProvider;

