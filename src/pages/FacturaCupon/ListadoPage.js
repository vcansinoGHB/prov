import React,{useEffect,useState} from 'react'
import { observer } from 'mobx-react'
import { useStores } from '../../hooks/use-stores'
import Breadcrumb from '../../components/Breadcrumb';
import Factura from '../../components/Factura';
import history from '../../helpers/history';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'; 
import Pagination from '../../components/Pagination';
import {CommaFormatted} from '../../helpers';
import Loading from '../../components/Loading';
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PdfDocument } from "../../components/contrarecibo/archivo";
import BtnContrarecibo from '../../components/BtnContrarecibo';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import './ListadoPage.css';

const ListadoPage = observer(({match}) => {

  const { cuponStore } = useStores();

  const [show, setShow]  = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = ()  => setShow(true);

  const [showr, setShowr] = useState(false);
  const handleCloser = () => setShowr(false);
  const handleShowr = ()  => setShowr(true);

 // const [showpdf, setHidepdf] = useState(false)

  useEffect(() => {
    if (match.params.pagina !== undefined) {
      cuponStore.ListCupones(parseInt(match.params.pagina),"",1);
    }

  }, [match,cuponStore]);

  const handlenuevafactura = () => {
    history.push('/addcupon', true);
  }

  const handleOnClick = (dato,moneda) => {
    handleShow();
    cuponStore.setMonedaFLAG(moneda);
    handleGetCupones(dato,moneda);
  }

  const handleOnClickRecibo = () => {
    // Muestra el modal de Contrarecibo
    var newDate = new Date();    
    cuponStore.setFechaInicio("");
    cuponStore.setFechaFin("");   
    cuponStore.setFechaInicio(newDate);
    cuponStore.setFechaFin(newDate); 
    
    cuponStore.setContrareciboFlag(false);
    handleShowr();
  }

  const handleGetCupones =(dato,moneda)=> {
   cuponStore.getCuponPreview(1,dato);
  }

  const handleBuscarRecibo =() => {
    // -------------------------------------
    // Busca los cupones del contrarecibo
    // ------------------------------------- 
    cuponStore.setContrareciboFlag(false); 
    cuponStore.getContrarecibo(1);
    //setHidepdf(true);
  }

  const handleFechaInicio = (date) => {
    cuponStore.setFechaInicio(date);
  }

  const handleFechaFin = (date) => {
    cuponStore.setFechaFin(date);
  }

 

  useEffect(() => {
    cuponStore.resetFactura();
    cuponStore.ListCupones(1,"",1);
  }, [cuponStore]);
  
  return (<div>
    <Breadcrumb titulo="Factura Cupones"/>
    <Modal show={showr} onHide={handleCloser} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Factura Cupones - Contrarecibo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={ e => {            
            e.preventDefault();
            handleBuscarRecibo();
          }}>
          <div className="mainrecibo">
              <div className="fecha1">
                  Fecha Inicio
                  <DatePicker selected={cuponStore.fechainicio}
                                    dateFormat="dd/MM/yyyy" 
                                    onChange={value => handleFechaInicio(value)} 
                                    className="datew" required/>
                     </div>
                     <div className="fecha2">
                        Fecha Final
                        <DatePicker selected={cuponStore.fechafin}
                                    dateFormat="dd/MM/yyyy" 
                                    onChange={value => handleFechaFin(value)} 
                                    className="datew" required/>
                     </div>
                     <div className="btnsearch">
                     <button type="submit" className="btn btn-info btn-sm">
                        Buscar
                    </button>
                     </div>
                 </div>
                 </form>
                { 
                 cuponStore.flagContrarecibo && cuponStore.listaContrarecibo.length > 0 && 
                  <PDFDownloadLink document={<PdfDocument 
                                   data={cuponStore.listaContrarecibo} />}
                      fileName="contrarecibo.pdf"
                      style={{
                                textDecoration: "none",
                                padding: "10px",
                                color: "#4a4a4a",
                                backgroundColor: "#f2f2f2",
                                border: "1px solid #4a4a4a"
                      }}>
                      {({ blob, url, loading, error }) =>
                          loading ? "Generando archivo pdf..." : "Descargar Archivo PDF"
                      }
                  </PDFDownloadLink>
                }
                {
                  cuponStore.flagContrarecibo && cuponStore.listaContrarecibo.length === 0 &&
                  <div className="alert alert-info" role="alert">
                       No se encontraron datos para generar el contrarecibo.
                   </div>
                }
              </Modal.Body>
             <Modal.Footer>
               <Button variant="secondary" onClick={handleCloser}>Cerrar</Button>          
             </Modal.Footer>
            </Modal>

      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Cupones</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
        cuponStore.flagcarga === true ? <Loading /> :
        <table className="table table-sm">
             <thead>
               <tr>
                   <th>Serie</th>
                   <th>Folio</th>
                   <th className="text-center">Tour</th>
                   <th>Adultos</th>
                   <th>Menores</th>
                   <th className="text-center">Monto</th>
               </tr>
             </thead>
             <tbody>
             { 
             
                cuponStore.listCuponPreview.map(item => 
                 <tr key={item.res_tourid}>
                    <td>{item.serie}</td> 
                    <td>{item.res_code}</td>
                    <td>{item.tour_nameesp}</td>
                    <td>{item.res_numadults}</td>
                    <td>{item.res_numchild}</td>
                    <td align="right">$
                    {
                      cuponStore.monedaFlag === "MXN" 
                      ? CommaFormatted(parseFloat(item.costomxn).toFixed(2) ) + " MXN" 
                      : CommaFormatted(parseFloat(item.res_costototal).toFixed(2) + " USD" ) 
                    }
                    </td>                    
                 </tr>)
              }
               <tr>
                 <td colSpan="5" align="right">Total</td>
                 <td align="right">
                   <strong>$
                 {
                    cuponStore.monedaFlag === "MXN" 
                      ? CommaFormatted(parseFloat(cuponStore.SumCuponesMXN).toFixed(2) ) + " MXN" 
                      : CommaFormatted(parseFloat(cuponStore.SumCuponesUSD).toFixed(2) + " USD" ) 
                 }
                   </strong>
                 </td>
               </tr>
               </tbody>
            </table>
          }
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>          
        </Modal.Footer>
      </Modal>
      <div className="container">
              <div className="row">
              <div className="col-sm-12 col-md-12">
                    <button type="button" className="btn btn-outline-info btn-sm float-right" onClick={handlenuevafactura}>
                        Nueva Factura
                    </button>
              </div>                 
              <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-6 centra">            
              {                
                cuponStore.listadoCupones === null | undefined 
                ? <div className="text-center">No hay facturas ingresadas.</div> 
                :
                cuponStore.cargaListaFlag === true ? <Loading /> : 
                cuponStore.listadoCupones.map((item,key) =>
                <> 
                   { key=== 0 ? <BtnContrarecibo key={key}
                                                 presionarec={() => handleOnClickRecibo()}/> : ""}
                    <Factura numero={item.facprov_facturanum} 
                             serie={item.facprov_factura}
                             fecha={item.facprov_fecha} 
                             monto={item.facprov_montototal}
                             moneda={item.facprov_moneda} 
                             idfactura={item.facprov_ID}
                             key={item.facprov_ID} 
                             presiona={() => handleOnClick (item.facprov_ID,item.facprov_moneda)} /> 
                </>) 
              } 
              {
                 cuponStore.listaPaginas === null ? '' : 
                  <div className="margenpag"> 
                    <Pagination paginacion={cuponStore.listaPaginas.pages} 
                                direccion="listcupon" />
                 </div>
               } 
              </div>
            </div>
            </div>
          </div>);
});

export default ListadoPage;
