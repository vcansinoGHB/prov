import React from 'react';  
import { Route, Redirect } from 'react-router-dom';  
import Nav from '../components/Nav';
import Header from '../components/Header';

  
const DashboardLayout = ({children, ...rest}) => {  
  return (  
    <div className="page page-dashboard"> 
       <Header/> 
       <div id="wrapper">
          <Nav/>  
            <div className="container-fluid">
              {children}             
            </div>
         
       </div> 
    </div>  
  )  
}  
  
const DashboardLayoutRoute = ({component: Component, ...rest}) => {  
  return (  
    <Route {...rest} render={matchProps => (  
      localStorage.getItem('usrtrx') ?  
      <DashboardLayout>  
          <Component {...matchProps} />  
      </DashboardLayout>
      :
      <Redirect to="/login" />  
    )} />  
    
  )  
};  
  
export default DashboardLayoutRoute;