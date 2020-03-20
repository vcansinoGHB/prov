import React from 'react';
import { Fragment } from "react";
import './BtnContrarecibo.css';

const BtnContrarecibo = (props) => {
  
  return (<Fragment>
            <button type="button" 
                    className="custom-button float-left bottom-espacio" 
                    onClick={props.presionarec}>Contrarecibo</button>
          </Fragment>);
};

export default BtnContrarecibo;