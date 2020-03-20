import React,{useEffect,useState} from 'react'
import { observer } from 'mobx-react'
import { useStores } from '../../hooks/use-stores'
import SubBreadcrumb from '../../components/SubBreadcrumb';
import FileUpload from '../../components/FileUpload';
import { formatDate,CommaFormatted } from '../../helpers';
import Validacion from '../../models';
import Loading from '../../components/Loading';
import axios from 'axios';
import './Cupon.css';

const Cupon = observer(({match}) => {

  const { cuponStore } = useStores();

   const [file,setFile]         = useState('');
   const [filename,setFilename] = useState('Adjunta Archivo XML');

   const [filepdf,setFilepdf]         = useState('');
  const [filenamepdf,setFilenamepdf] = useState('Adjunta Archivo PDF');

  const DeleteCupon = (tour) => {
     cuponStore.deleteCupon(tour);
  }

 const handleUploadingPDF = () => {
     
  if (filepdf !== '' && filepdf !== null && filepdf !== undefined) {

    let data = new FormData();
    data.append('file', filepdf);

    if (!cuponStore.errores) {
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

     if (!cuponStore.errores) {
       axios.post('https://devsia.translamex.com/json/Proveedores/uploading', data)
       .then(res => {
         console.log(res);
         console.log(res.data);
       });
     }

   }
   
  }

  const addCuponArray = (serie,rescode,adultos,menores,costo,tour,tourclave,validacupon,resTourID,tipocambio,montomxn) => {
      
    const tmpCupon = Object.create(Validacion, {serie:{value:serie},
                                                rescode:{value:rescode},
                                                adultos:{value:adultos},
                                                menores:{value:menores},
                                                costo:{value:costo},
                                                tour:{value:tour},
                                                tourclave:{value:tourclave},
                                                validacupon:{value:validacupon},
                                                resTourID:{value:resTourID} ,
                                                tipocambio:{value:tipocambio},
                                                montomxn:{value:montomxn}
                                               });
    cuponStore.addCupon(tmpCupon);

  };

  
   const xmlreadFunction = (archivo) => {

    var parser, xmlDoc;
     
     var reader = new FileReader();
     reader.onload = function(e) {
         var content = reader.result;
         //Here the content has been read successfuly
        
         var contenido = content.toString();
         parser        = new DOMParser();
         xmlDoc        = parser.parseFromString(contenido,"text/xml");         

         if (xmlDoc.getElementsByTagName("cfdi:Comprobante")[0] !== undefined) {

         cuponStore.setSerie(xmlDoc.getElementsByTagName("cfdi:Comprobante")[0].getAttribute("Serie"));
         cuponStore.setFolio(xmlDoc.getElementsByTagName("cfdi:Comprobante")[0].getAttribute("Folio"));
         cuponStore.setSubtotal(xmlDoc.getElementsByTagName("cfdi:Comprobante")[0].getAttribute("SubTotal"));
         cuponStore.setTotal(xmlDoc.getElementsByTagName("cfdi:Comprobante")[0].getAttribute("Total"));
         cuponStore.setFecha(formatDate(xmlDoc.getElementsByTagName("cfdi:Comprobante")[0].getAttribute("Fecha")));
         cuponStore.setMoneda(xmlDoc.getElementsByTagName("cfdi:Comprobante")[0].getAttribute("Moneda"));

         //console.log("informacion: " + xmlDoc.getElementsByTagName("cfdi:Impuestos")[0].childNodes[0].childNodes[0].getAttribute("Impuesto") );
        
          // SE agrega el IVA clave 002
        if (xmlDoc.getElementsByTagName("cfdi:Impuestos")[0].childNodes[0].childNodes[0] !== undefined) {
           if ( xmlDoc.getElementsByTagName("cfdi:Impuestos")[0].childNodes[0].childNodes[0].getAttribute("Impuesto").toString() === '002') {
            cuponStore.setIVA(xmlDoc.getElementsByTagName("cfdi:Impuestos")[0].childNodes[0].childNodes[0].getAttribute("Importe"));
           }  
        }

         // SE agrega el IVA clave 002
    if (xmlDoc.getElementsByTagName("cfdi:Impuestos")[0].childNodes[1]!== undefined){
    if (xmlDoc.getElementsByTagName("cfdi:Impuestos")[0].childNodes[1].childNodes[1] !== undefined) {
     //console.log( xmlDoc.getElementsByTagName("cfdi:Impuestos")[0].childNodes[1].childNodes[1].getAttribute("Impuesto").toString());
      if ( xmlDoc.getElementsByTagName("cfdi:Impuestos")[0].childNodes[1].childNodes[1].getAttribute("Impuesto").toString() === '002') {
        cuponStore.setIVA(xmlDoc.getElementsByTagName("cfdi:Impuestos")[0].childNodes[1].childNodes[1].getAttribute("Importe"));
      }  
    }
  }
                  
    if (xmlDoc.getElementsByTagName("tfd:TimbreFiscalDigital")[0] !== undefined) {
      cuponStore.setUUID( xmlDoc.getElementsByTagName("tfd:TimbreFiscalDigital")[0].getAttribute("UUID") );
    }
         
         } else {
          cuponStore.errores = "Se encontró un error al leer el xml de la factura.";
         }
     }
     reader.readAsText(archivo);
   }
  

  useEffect(() => {
    if (file !== "") {
      xmlreadFunction(file);
    }
  }, [file,xmlreadFunction]);


  useEffect(() => {
    if ( match.params.facturaid !== undefined ) {
      cuponStore.GetFacturaByID(match.params.facturaid,1);
    }
  }, [match.params.facturaid,cuponStore]);
  
  const handleOnChangeFileXML = e => {

    setFile(e.target.files[0]);
    //setFilename(e.target.files[0].name);
    cuponStore.setArchivoXML(e.target.files[0].name);
  };
    
  const handleOnChangeFilePDF = e => {
    setFilepdf(e.target.files[0]);
    //setFilenamepdf(e.target.files[0].name);
    cuponStore.setArchivoPDF(e.target.files[0].name);
  };

  const handleBuscarChange = (e) => {
    cuponStore.setClaveBuscar(e.target.value);
  };

  const descargarXML = () => {

    fetch('https://devsia.translamex.com/json/Proveedores/getArchivo?filename=' + cuponStore.ArchivoXml )
     .then((response) => response.blob())
       .then((blob) => {                
               const url = window.URL.createObjectURL(new Blob([blob]));
               const link = document.createElement('a');
               link.href = url;
               link.setAttribute('download', cuponStore.ArchivoXml);  // 3. Append to html page
               document.body.appendChild(link);  // 4. Force download
               link.click();  // 5. Clean up and remove the link
               link.parentNode.removeChild(link);  
         });
  }

  const descargarPDF = () => {    
   fetch('https://devsia.translamex.com/json/Proveedores/getArchivo?filename=' + cuponStore.ArchivoPdf )
   .then((response) => response.blob())
     .then((blob) => {                
             const url = window.URL.createObjectURL(new Blob([blob]));
             const link = document.createElement('a');
             link.href = url;
             link.setAttribute('download', cuponStore.ArchivoPdf);  // 3. Append to html page
             document.body.appendChild(link);  // 4. Force download
             link.click();  // 5. Clean up and remove the link
             link.parentNode.removeChild(link);  
       });
  }

  return (<div>
        <SubBreadcrumb titulo="Facturar Cupones" 
        subtitulo={match.params.facturaid === undefined ? "Agregar Factura" : "Editar Factura"} 
        url="/listcupon"/>
 
        
          {
            cuponStore.errores ?
           <div className="alert alert-danger" role="alert">
              {cuponStore.errores}
           </div>
           : ""
          }
        
        <form>
            <div className="row">
               <div className="col-md-5">
                  <FileUpload tipo=".xml" onChangeFile={handleOnChangeFileXML} 
                                          nombreArchivo={cuponStore.ArchivoXml} />
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
                                         nombreArchivo={cuponStore.ArchivoPdf} />
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
                       placeholder="Serie" readOnly value={cuponStore.Serie}/>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="folio">Folio</label> 
                <input type="text" 
                       className="form-control form-control-sm" 
                       id="folio" placeholder="Folio" readOnly value={cuponStore.Folio}/>
              </div>
            <div className="col-md-3 mb-3">
                <label htmlFor="subtotal">SubTotal</label>
                <input type="text" 
                       className="form-control form-control-sm" 
                       id="subtotal" 
                       placeholder="Subtotal" readOnly value={cuponStore.Subtotal} />
            </div>
            <div className="col-md-3 mb-3">
                <label htmlFor="total">Total</label>
                <input type="text" 
                       className="form-control form-control-sm" 
                       id="total" 
                       placeholder="Total" readOnly value={cuponStore.Total}/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 mb-3">
                <label htmlFor="fecha">Fecha</label> 
                <input type="text" className="form-control form-control-sm" 
                       id="fecha" 
                       placeholder="Fecha" readOnly value={cuponStore.Fecha}/>
            </div>
            <div className="col-md-3 mb-3">
               <label htmlFor="registro">Registro</label> 
               <input type="text" 
                      className="form-control form-control-sm" 
                      id="registro" placeholder="Registro" readOnly value={cuponStore.Registro}/>
            </div>
            <div className="col-md-3 mb-3">
                <label htmlFor="tc">T.C.</label>
                <input type="text" 
                       className="form-control form-control-sm" 
                       id="tc" 
                       placeholder="Tipo de Cambio" readOnly value={cuponStore.TC} />
            </div>
            <div className="col-md-3 mb-3">
                <label htmlFor="totalmxn">Total MXN</label>
                <input type="text" 
                       className="form-control form-control-sm" 
                       id="totalmxn" 
                       placeholder="Total MXN" readOnly value={cuponStore.TotalMXN}/>
            </div>
          </div>   
          <div className="row">
            <div className="col-md-3 mb-3">
                <label htmlFor="retiva">Ret. IVA</label> 
                <input type="text" className="form-control form-control-sm" 
                       id="retiva" 
                       placeholder="Ret. IVA" readOnly value={cuponStore.retIVA}/>
            </div>
            <div className="col-md-3 mb-3">
               <label htmlFor="iva">IVA</label> 
               <input type="text" 
                      className="form-control form-control-sm" 
                      id="iva" placeholder="IVA" readOnly value={cuponStore.IVA}/>
            </div>
            <div className="col-md-3 mb-3">
                <label htmlFor="descuento">Descuento</label>
                <input type="text" 
                       className="form-control form-control-sm" 
                       id="descuento" 
                       placeholder="Descuento" readOnly value={cuponStore.Descuento} />
            </div>
            <div className="col-md-3 mb-3">
                <label htmlFor="moneda">Moneda</label>
                <input type="text" 
                       className="form-control form-control-sm" 
                       id="moneda" 
                       placeholder="Moneda" readOnly value={cuponStore.Moneda}/>
            </div>
          </div>                   
          <div className="row">
            <div className="col-md-3 mb-3">
                <label htmlFor="retisr">Ret. ISR</label> 
                <input type="text" className="form-control form-control-sm" 
                       id="retisr" 
                       placeholder="Ret. ISR" readOnly value={cuponStore.retISR}/>
            </div>
            <div className="col-md-3 mb-3">
               <label htmlFor="isr">ISR</label> 
               <input type="text" 
                      className="form-control form-control-sm" 
                      id="isr" placeholder="ISR" readOnly value={cuponStore.ISR}/>
            </div>
            <div className="col-md-3 mb-3">
                <label htmlFor="retotros">Ret. Otros</label>
                <input type="text" 
                       className="form-control form-control-sm" 
                       id="retotros" 
                       placeholder="Ret. Otros" readOnly value={cuponStore.retOtros} />
            </div>
            <div className="col-md-3 mb-3">
                <label htmlFor="otros">Otros</label>
                <input type="text" 
                       className="form-control form-control-sm" 
                       id="otros" 
                       placeholder="Otros" readOnly value={cuponStore.Otros}/>
            </div>
          </div>  
          <div className="row">
          <div className="col-md-9 mb-3">
                <label htmlFor="uuid">UUID</label> 
                <input type="text" className="form-control form-control-sm" 
                       id="uuid" 
                       placeholder="UUID" readOnly value={cuponStore.UUID}/>
            </div>
          <div className="col-md-3 mb-3">
                <label htmlFor="ieps">IEPS</label> 
                <input type="text" className="form-control form-control-sm" 
                       id="ieps" 
                       placeholder="IEPS" readOnly value={cuponStore.IEPS}/>
            </div>
          </div>
        </form>
        <form onSubmit={ e=> {
            e.preventDefault();
            cuponStore.BuscarCupones();
        }}>
        <div className="row">
            <div className="col-12 col-sm-4 col-md-3"> 
                <input type="text" 
                       className="form-control form-control-sm" 
                       id="buscar" 
                       placeholder="Ingrese número de cupón..."
                       value={cuponStore.cuponBuscar}
                       onChange={handleBuscarChange} />
            </div> 
            <div className="col-12 col-sm-2 col-md-2">
               <button type="submit" 
                       className="btn btn-outline-info btn-sm">Buscar Cupón</button>
            </div> 
        </div>
        </form>
        <div className="row tablespace">
          <div className="col-12 col-sm-8 col-md-8">            
            {
            cuponStore.flagcarga === true ? <Loading/> :
            <table className="table table-sm">
                <thead>
                 <tr>
                  <th>Rescode</th>
                  <th>ID</th>
                  <th>Adultos</th>
                  <th>Menores</th>
                  <th>Costo Total</th>
                  <th>Agregar</th>
                 </tr>
                </thead>
                <tbody>
                { 
            cuponStore.arreglocupones.map((cupon,key) => 
              <tr key={cupon.rescode}> 
                <td>{cupon.rescode}</td>
                <td>{key + 1}</td>
                <td>{cupon.adultos}</td>
                <td>{cupon.menores}</td>
                <td>${cuponStore.Moneda === "MXN" ? CommaFormatted(parseFloat(cupon.montomxn).toFixed(2)) : CommaFormatted(parseFloat(cupon.costo).toFixed(2))}</td>
                <td>
                  {
                     cupon.validacupon === 0 ? <span className='cuponvalidado'>El cupón no ha sido validado.</span> :
                    <i className="fa fa-check-square fa-lg coloricon" alt="seleccion" onClick={() => addCuponArray(cupon.serie,
                                                                                                  cupon.rescode,
                                                                                                  cupon.adultos,
                                                                                                  cupon.menores,
                                                                                                  cupon.costo,
                                                                                                  cupon.tour,
                                                                                                  cupon.tourclave,
                                                                                                  cupon.validacupon,
                                                                                                  cupon.resTourID,
                                                                                                  cupon.tipocambio,
                                                                                                  cupon.montomxn)}>
                   
                    </i>
                  }
                </td>
              </tr>)
            }  
            </tbody>
        </table>
          }
      </div>
      <div className="col-12 col-sm-4 col-md-4">
        <div className="col text-center">
         {
            cuponStore.errores ?
            <div className="alert alert-danger" role="alert">
              {cuponStore.errores}
            </div>
            : ""
         }
         {
            cuponStore.Moneda === "MXN" && (cuponStore.SumaCostosMXN2 <= 0.01 && cuponStore.SumaCostosMXN!==0  )  ? 
            <button type="submit" className="btn btn-outline-info btn-sm" 
              onClick={e => {
                e.preventDefault();                                                     
                cuponStore.ChkExisteFactura(match.params.facturaid);
                handleUploadingPDF();
                handleUploadingXML();
            }}>
            {
              cuponStore.saedFlag === true ? 
              <span className="spinner-border spinner-border-sm mr-1"></span> 
              : ""
            }    
              Guardar Factura
            </button> :""                     
            }
            {
              cuponStore.Moneda === "MXN" && (cuponStore.SumaCostosMXN2 > 0.01  && cuponStore.SumaCostosMXN!== 0  )  
                ? <div className="alert alert-danger" role="alert">
                       El monto de la factura ${ CommaFormatted(parseFloat( cuponStore.Total).toFixed(2)) } es mayor al monto total de los cupones
                    </div> :""                   
            }
            {              
             cuponStore.Moneda === "USD" && ( cuponStore.SumaCostosUSD  <= 0.01) && cuponStore.SumaCostos!==0  ? 
             <button type="submit" className="btn btn-outline-info btn-sm" 
              onClick={e => {
                  e.preventDefault();                                                     
                  cuponStore.ChkExisteFactura(match.params.facturaid);
                  handleUploadingPDF();
                  handleUploadingXML();
              }}>
             {
               cuponStore.saedFlag === true ? 
               <span className="spinner-border spinner-border-sm mr-1"></span> 
               : ""
             } 
             Guardar Factura
            </button> :""                     
            }
            {
             cuponStore.Moneda === "USD" && (cuponStore.SumaCostosUSD > 0.01  && cuponStore.SumaCostos!== 0  )  
              ? <div className="alert alert-danger" role="alert">
                 El monto de la factura ${ CommaFormatted(parseFloat( cuponStore.Total).toFixed(2)) } es mayor al monto total de los cupones
                </div> :""                   
            }
                  
              </div>
              </div>
        </div>
        <div className="row">
        
          <div className="col-12 col-sm-12 col-md-8">
          
              <h6 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Cupones</span>
                {
                cuponStore.CuponesCount === 0 ? '' :
                <span className="badge badge-secondary badge-pill">{cuponStore.CuponesCount}</span>
               }
              </h6>

              <ul className="list-group centro">
                 <li className="list-group-item d-flex justify-content-between bg-light">
                  <div className="text-success">ES: {cuponStore.SumaCostosUSD}
                      <span> Total { cuponStore.Moneda === "MXN" ? "(MXN)":"(USD)" }</span>
                  </div>
                  <span className="text-success">
                      <strong>$ { cuponStore.Moneda === "MXN" ? CommaFormatted(parseFloat(cuponStore.SumaCostosMXN).toFixed(2)) : CommaFormatted(parseFloat(cuponStore.SumaCostos).toFixed(2))}</strong>
                  </span>
                 </li>
              {
                cuponStore.CuponesCount === 0 ? <li className="list-group-item d-flex justify-content-between lh-condensed"><small className="text-muted">No se han seleccionado cupones</small></li> :
              cuponStore.cuponesValida.map(cupon => (
              <li key={cupon.rescode} className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                 <h6 className="my-0">
                   <i className="fa fa-times-circle fa-lg coloricondelete" onClick={()=>DeleteCupon(cupon)}></i> {cupon.serie} {cupon.rescode}
                   <small className="text-muted"> {cupon.tour}</small>
                 </h6>
            <small className="text-muted">Adulto {cupon.adultos} Menores {cupon.menores}</small><br/>
            
              </div>
              <span className="text-muted">${ cuponStore.Moneda === "MXN" ? CommaFormatted(parseFloat(cupon.montomxn).toFixed(2)) :CommaFormatted(parseFloat(cupon.costo).toFixed(2))} </span>
              </li>))
              }

                 
                
              </ul>
          </div>

        </div>
    </div>);
  });
  
  export default Cupon;
  