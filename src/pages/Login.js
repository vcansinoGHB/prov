import React from 'react'
import { observer } from 'mobx-react'
import { useStores } from '../hooks/use-stores'

const Login = observer(() => {
    
  const { authStore } = useStores();

  const handleEmailChange = (e) => {
    authStore.setEmail(e.target.value);
  };

  const handlePasswordChange = (e) =>{
   authStore.setPassword(e.target.value);
  }

  return (
    <div>  
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign In</h1>
                <p className="text-xs-center">{authStore.errores}</p>
              <form onSubmit={ e => {
                   authStore.login();
                    e.preventDefault();
                }}>
              <fieldset>
               <fieldset className="form-group">
                    <input className="form-control form-control-lg"
                           type="email"
                           placeholder="Email"
                           value={authStore.values.email}
                           onChange={handleEmailChange} />
               </fieldset>
               <fieldset className="form-group">
                   <input className="form-control form-control-lg"
                          type="password"
                          placeholder="Password"
                          value={authStore.values.password}
                          onChange={handlePasswordChange} />
               </fieldset>
               <button className="btn btn-lg btn-primary pull-xs-right" type="submit">
                Sign in
               </button>
               </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
});

export default Login;

