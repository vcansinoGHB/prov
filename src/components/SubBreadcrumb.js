import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumb.css';

const SubBreadcrumb = (props) => {
  return (<ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/Home">Home</Link></li>
            <li className="breadcrumb-item active"><Link to={props.url}>{props.titulo}</Link></li>
            <li className="breadcrumb-item active">{props.subtitulo}</li>
          </ol>);
};

export default SubBreadcrumb;