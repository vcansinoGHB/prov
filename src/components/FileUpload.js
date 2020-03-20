import React from 'react';
import { Fragment } from "react";

const FileUpload = (props) => {
    return (
      <Fragment>
        <div className="custom-file"> 
            <input type="file" 
                    className="custom-file-input" 
                    id="customFile" 
                    accept={ props.tipo } 
                    onChange={ props.onChangeFile } />
            <label className="custom-file-label" 
                   htmlFor="customFile">{props.nombreArchivo}</label>
        </div>
      </Fragment>);
}

export default FileUpload;
