import React from 'react';
import { Link } from 'react-router-dom';
import './FacturaProvider.css';
import {CommaFormatted,formatDatedmy} from '../helpers';

const FacturaProvider = (props) => {

    return (<div className="mainFactura">
               <div className="itemsFactura">
                  <div className="linkfactura">
                    <Link to={`/editfactura/${props.idfactura}`} className="colorlink">
                      Factura {props.serie}{props.numero}
                    </Link>
                  </div>
               </div>
              <div className="itemFacturaDesc">Fecha de la factura {formatDatedmy(props.fecha)}</div>
               <div className="itemFacturaMonto">
                   <span className="montolabelc"> Monto total :</span> ${ CommaFormatted( parseFloat(props.monto).toFixed(2) ) } {props.moneda}</div>
            </div>);
  
  };
  
  export default FacturaProvider;