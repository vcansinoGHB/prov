import { observable, action } from 'mobx'
import { apiService } from '../services';

import  history  from '../helpers/history';

export class AuthStore {

  @observable inProgress = false;
  @observable errores    = undefined;

  @observable values = {
    email: '',
    password: '',
  };

  @action setEmail(email) {
    this.values.email = email;
    this.errores ='';
  }

  @action setPassword(password) {
    this.values.password = password;
    this.errores = '';
  }

  @action reset() {
    this.values.email    = '';
    this.values.password = '';
  }

  @action logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('usrtrx');
  }

  @action login() {

     this.inProgress = true;
   /* return apiService.Login(this.values.email,this.values.password)
            .then( console.log('entra a login') )
            .catch( action( (err) => {  
              this.errores = err.response && err.response.body && err.response.body.errors;
            })).finally( action(() => { this.inProgress = false; }) );*/
      return apiService.Login(this.values.email,this.values.password).then(
        user => {
          this.inProgress = false;
          localStorage.setItem('usrtrx', JSON.stringify(user));
          history.push('/home', true);
        },
        err => {
          this.errores = err.toString();
          this.inProgress = false;
        });
  }

}