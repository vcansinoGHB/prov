import React from 'react';
import { Router, Redirect, Switch } from 'react-router-dom';

import LoginLayoutRoute from "./layouts/LoginLayout";  
import DashboardLayoutRoute from "./layouts/DashboardLayout";  

import Login from './pages/Login';
import HomePage from './pages/HomePage';
import Zona from './pages/Zona/Zona';
import ListZona from './pages/Zona/ListZona';
import ListTipoCambio from './pages/TipoCambio/ListTipoCambio';
import TipoCambio from './pages/TipoCambio/TipoCambio';
import ValidaPage from './pages/Valida/ValidaPage';
import ListadoPage from './pages/FacturaCupon/ListadoPage';
import ListFacturaProv from './pages/FacturaProveedor/ListFacturaProv';
import Cupon from './pages/FacturaCupon/Cupon';
import FacturaProvider from './pages/FacturaProveedor/FacturaProvider';
import listUsuario from './pages/Usuarios/listUsuario';
import frmUsuario from './pages/Usuarios/frmUsuario';
import Cambio from './pages/CambioProveedor/Cambio';

import history from './helpers/history';

function App() {

  return (
    <Router history={history}>
      <Switch> 
          <DashboardLayoutRoute exact path="/home" component={HomePage} /> 
          <DashboardLayoutRoute exact path="/zona" component={Zona} />
          <DashboardLayoutRoute exact path="/zonaedit/:zonaid" component={Zona} />
          <DashboardLayoutRoute exact path="/listazonas" component={ListZona} />
          <DashboardLayoutRoute exact path="/listatc" component={ListTipoCambio} /> 
          <DashboardLayoutRoute exact path="/tc" component={TipoCambio} /> 
          <DashboardLayoutRoute exact path="/tcedit/:tcid" component={TipoCambio} />
          <DashboardLayoutRoute exact path="/valida" component={ValidaPage} /> 
          <DashboardLayoutRoute exact path="/listcupon" component={ListadoPage} /> 
          <DashboardLayoutRoute exact path="/listcupon/:pagina" component={ListadoPage} /> 
          <DashboardLayoutRoute exact path="/addcupon" component={Cupon} />
          <DashboardLayoutRoute exact path="/editcupon/:facturaid" component={Cupon} />
          <DashboardLayoutRoute exact path="/proveedor" component={ListFacturaProv} />
          <DashboardLayoutRoute exact path="/proveedor/:pagina" component={ListFacturaProv} />
          <DashboardLayoutRoute exact path="/addfactura" component={FacturaProvider} /> 
          <DashboardLayoutRoute exact path="/editfactura/:facturaid" component={FacturaProvider} /> 
          <DashboardLayoutRoute exact path="/listuser/:pagina" component={listUsuario} /> 
          <DashboardLayoutRoute exact path="/listuser" component={listUsuario} /> 
          <DashboardLayoutRoute exact path="/edituser/:idusuario" component={frmUsuario} /> 
          <DashboardLayoutRoute exact path="/adduser" component={frmUsuario} /> 
          <DashboardLayoutRoute exact path="/cambio" component={Cambio} /> 
          
          <LoginLayoutRoute exact path="/login" component={Login} />
         <Redirect from="*" to="/login" />
      </Switch>
    </Router>
  );
}

export default App;
