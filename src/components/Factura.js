import React from 'react';
import { Link } from 'react-router-dom';
import './Factura.css';
import {CommaFormatted,formatDatedmy} from '../helpers';

const Factura = (props) => {

  return (<div className="mainFactura">
             <div className="itemsFactura">
                <div className="linkfactura">
                  <Link to={`/editcupon/${props.idfactura}`}>
                    Factura {props.serie}{props.numero}
                  </Link>
                  <button type="button" className="my-custom-button2 float-right" onClick={props.presiona}>Cupones</button>
                </div>
               
             </div>
            <div className="itemFacturaDesc">Fecha de la factura {formatDatedmy(props.fecha)}</div>
             <div className="itemFacturaMonto">
                 <span className="montolabelc"> Monto total :</span> ${ CommaFormatted(parseFloat(props.monto).toFixed(2) ) } {props.moneda}</div>
          </div>);

};

export default Factura;