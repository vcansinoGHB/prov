import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumb.css';

const Breadcrumb = (props) => {

  return (<ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/Home">Home</Link>
            </li>
            <li className="breadcrumb-item active">{props.titulo}</li>
          </ol>);

};

export default Breadcrumb;