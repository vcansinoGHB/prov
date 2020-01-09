import { observable, action } from 'mobx'
import { apiService } from '../services';

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

  @action login() {

   /* return apiService.Login(this.values.email,this.values.password)
            .then( console.log('entra a login') )
            .catch( action( (err) => {  
              this.errores = err.response && err.response.body && err.response.body.errors;
            })).finally( action(() => { this.inProgress = false; }) );*/

       return apiService.Login(this.values.email,this.values.password).then(
              user => { 
                 console.log(user);
              },
              err => {
                this.errores = err.toString();
              });
       }

}