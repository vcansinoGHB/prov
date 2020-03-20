import React from 'react'
import { observer } from 'mobx-react'
import { useStores } from '../hooks/use-stores'
import './Login.css';

const Login = observer(() => {
    
  const { authStore } = useStores();

  const handleEmailChange = (e) => {
    authStore.setEmail(e.target.value);
  };

  const handlePasswordChange = (e) =>{
    authStore.setPassword(e.target.value);
  }

  return (<div className="container">
          <div className="card card-login mx-auto mt-5">
             <div className="card-header">Login</div>
             <div className="card-body">
             <p className="text-center err-msg">{authStore.errores}</p>
             <form onSubmit={ e => {
                  authStore.login();
                   e.preventDefault();
               }}>
             <fieldset>
              <fieldset className="form-group">
                   <input className="form-control"
                          type="email"
                          placeholder="Email"
                          value={authStore.values.email}
                          onChange={handleEmailChange} />
               </fieldset>
               <fieldset className="form-group">
                  <input className="form-control"
                         type="password"
                         placeholder="Password"
                         value={authStore.values.password}
                         onChange={handlePasswordChange} />
               </fieldset>
               <button className="btn btn-sm btn-primary btn-block" type="submit" disabled={authStore.inProgress}>
                  {
                  authStore.inProgress === true ? 
                    <span className="spinner-border spinner-border-sm mr-1"></span> 
                    : ""
                  }
                  Entrar
               </button>
              </fieldset>
            </form>  
            </div>
          </div>
        </div>)
});

export default Login;

