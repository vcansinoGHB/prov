import React from 'react';
import { observer } from 'mobx-react'
import { useStores } from '../hooks/use-stores'
import { Link } from 'react-router-dom';
import  history  from '../helpers/history';
import { authData } from '../helpers';
import './Header.css';

const Header = observer(() => {

  const { authStore } = useStores();

  const navpermiso = authData();

  const salir = () =>{
    authStore.logout();
    history.push('/login');
  }

  return (<div><nav className="navbar fixed-top navbar-expand navbar-dark bg-dark">
                 <Link className="navbar-brand mr-1" to="/home"> 
                   {navpermiso.empresa}
                 </Link> 
                 <button className="btn btn-link btn-sm text-white order-1 order-sm-0" id="sidebarToggle" href="#">
                   <i className="fa fa-bars"></i>
                 </button>     
                 <ul className="navbar-nav ml-auto ml-md-0">
                  <li className="nav-item dropdown no-arrow">
                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                     <i className="fa fa-user-circle fa-lg"></i>
                    </a>
                     <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                       <a className="dropdown-item" data-toggle="modal" data-target="#logoutModal" onClick={salir}>
                          Salir
                       </a>                   
                </div>
              </li>
            </ul>
          </nav></div>);
    
});

export default Header;