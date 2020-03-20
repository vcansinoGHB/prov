import React from 'react';
import { Link } from 'react-router-dom';
import { authData } from '../helpers';
import './Nav.css';

const Nav = () => {

  const navpermiso = authData();

  return (<ul className="sidebar navbar-nav">
      <li className="nav-item active">
        <Link className="nav-link" to="/valida">
          <i className="fa fa-file iconside"></i>
          <span> Valida Cupones</span>
        </Link>
      </li>
      {
        navpermiso.facturacupon === 1 ?
      <li className="nav-item">
        <Link className="nav-link" to="/listcupon">
        <i className="fa fa-credit-card iconside"></i>
          <span> Factura Cupones</span>
        </Link>              
      </li>
      : ''
      }
      {
        navpermiso.factura === 1 ?
      <li className="nav-item">
        <Link className="nav-link" to="/proveedor">
        <i className="fa fa-user iconside"></i>
          <span> Factura Proveedor</span>
        </Link>
      </li>
      : ''
      }   
      {
      navpermiso.admon === 1 ? 
      <div>     
      <li className="nav-item">
        <Link className="nav-link" to="/listazonas">
          <span>Zona Tipo de Cambio</span>
        </Link>
      </li>      
      <li className="nav-item">
        <Link className="nav-link" to="/listatc">        
          <span>Tipo de Cambio</span>
        </Link>
      </li> 
      <li className="nav-item">
        <Link className="nav-link" to="/listUser">
          <span>Usuarios</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/cambio">
          <span>Cambio de Proveedor</span>
        </Link>
      </li>      
      </div>
      : ''
      }                       
    </ul>);
  
}

export default Nav;
