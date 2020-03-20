import React,{useEffect,useState} from 'react'
import { observer } from 'mobx-react'
import { useStores } from '../../hooks/use-stores'
import Breadcrumb from '../../components/Breadcrumb';
import FacturaProvider from '../../components/FacturaProvider';
import Pagination from '../../components/Pagination';
import history from '../../helpers/history'; 
import Loading from '../../components/Loading';
import BtnContrarecibo from '../../components/BtnContrarecibo';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PdfDocument } from "../../components/contrarecibo/archivo";
import './ListFacturaProv.css';

const ListFacturaProv = observer(({match}) => {

  const { cuponproviderStore } = useStores();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {

    if (match.params.pagina !== undefined) {
      cuponproviderStore.ListProveedorFacturas(parseInt( match.params.pagina),"",2);
    }

  }, [match,cuponproviderStore]);

  
  useEffect(() => {    
    cuponproviderStore.resetFactura(); 
    cuponproviderStore.ListProveedorFacturas(1,"",2);

  }, [cuponproviderStore]);

  const handlenuevafactura = () => {
    history.push('/addfactura', true);
  }

  const handleOnClick = () => {
    var newDate = new Date();    
    cuponproviderStore.setFechaInicio("");
    cuponproviderStore.setFechaFin("");   
    cuponproviderStore.setFechaInicio(newDate);
    cuponproviderStore.setFechaFin(newDate); 
    
    cuponproviderStore.setFlagContrarecibo(false);
    handleShow();
  }

  const handleBuscarRecibo =() => {

    cuponproviderStore.setFlagContrarecibo(false); 
    cuponproviderStore.getContrarecibo(2);
  }

  const handleFechaInicio = (date) => {
    cuponproviderStore.setFechaInicio(date);
  }
  const handleFechaFin = (date) => {
    cuponproviderStore.setFechaFin(date);
  }
  
  return (<div>
            <Breadcrumb titulo="Factura Proveedor"/>
            <Modal show={show} onHide={handleClose} animation={true}>
             <Modal.Header closeButton>
             <Modal.Title>Factura Proveedor - Contrarecibo</Modal.Title>
             </Modal.Header>
              <Modal.Body>                
              <form onSubmit={ e => {            
                    e.preventDefault();
                    handleBuscarRecibo();
                }}>
                 <div className="mainrecibo">
                     <div className="fecha1">
                        Fecha Inicio
                        <DatePicker selected={cuponproviderStore.fechainicio}
                                    dateFormat="dd/MM/yyyy" 
                                    onChange={value => handleFechaInicio(value)} 
                                    className="datew" required/>
                     </div>
                     <div className="fecha2">
                        Fecha Final
                        <DatePicker selected={cuponproviderStore.fechafin}
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
                 cuponproviderStore.flagContrarecibo && cuponproviderStore.listaContrarecibo.length > 0 &&
                   <PDFDownloadLink document={<PdfDocument data={cuponproviderStore.listaContrarecibo} />}
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
                 cuponproviderStore.flagContrarecibo && cuponproviderStore.listaContrarecibo.length === 0 &&
                  <div className="alert alert-info" role="alert">
                     No se encontraron datos para generar el contrarecibo.
                  </div>
               }
              </Modal.Body>
             <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>Cerrar</Button>          
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
               cuponproviderStore.listadoCuponesProv == undefined | null ? 
               <div className="text-center">No hay facturas ingresadas.</div> 
               :   
               cuponproviderStore.cargaListaFlag === true ? <Loading /> :                                     
                cuponproviderStore.listadoCuponesProv.map((item,key) =>  
                  <>
                   {key=== 0 ? <BtnContrarecibo key={item.facprov_ID}
                                                presionarec={() => handleOnClick()}/> : ""}
                   <FacturaProvider key={item.facprov_facturanum} 
                                    fecha={item.facprov_fecha}
                                    monto={item.facprov_montototal}
                                    numero={item.facprov_facturanum} 
                                    serie={item.facprov_factura}
                                    idfactura={item.facprov_ID} 
                                    moneda={item.facprov_moneda} /> 
                  </>)
               } 
               {
                cuponproviderStore.listPaginas === null ? '' : 
                 <div className="margenpag"> 
                    <Pagination paginacion={cuponproviderStore.listPaginas.pages} 
                                direccion="proveedor" />
                </div>
               } 
              </div>
            </div>
          </div>
        </div>);
});

export default ListFacturaProv;