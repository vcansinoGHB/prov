import React from 'react';
import { Link } from 'react-router-dom';
import './Pagination.css';

const Pagination = (props) => {
    return (<ul className="pagination">
      {
        props.paginacion === undefined || null ? '' :            
          props.paginacion.map(item =>
            <li className="page-item" key={item}>
               <Link to={`/${props.direccion}/${item}`} 
                     className="page-link" 
                     onClick={props.paginaclick}>{item}</Link>
            </li>)
      } 
      </ul>);
};
  
  export default Pagination;