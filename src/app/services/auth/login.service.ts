import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
// HTTP
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import 'rxjs/add/operator/map';

// Router
import { Router } from '@angular/router';

// Models
import { User } from 'app/models/user.model';

import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';



@Injectable({
  providedIn: 'root'
})

export class LoginService {

  identity: any;
  token: string;
  build: Boolean = false;
  _permissions: any = [];
  _permissions_slugs: any = [];
  appData: any = {};

    constructor(
        private http: Http,
        private router: Router,
        public snackBar: MatSnackBar,
    ){
        if ( !this.build ) {
            this.__construct_data();
        }
    }
    // Generate base data
    __construct_data(){
      this.build = true;
      // Get token from local storage
      this._initializeToken();

      // Get identity from local strorage
      this._initializeIdentity();
  }

    _requestOptions() {
        let headers = new HttpHeaders({'Authorization': this.getToken()});
        let requestOptions = {headers : headers};
        return requestOptions;
    }



  // Load token from local storage and set up in a local variable
  _initializeToken(){
      let token = localStorage.getItem('token');
      if(token!=undefined){
          this.token = token
          this.validate_token();
      } else{
          this.token = null;
          this._autoLogout();
      }
  
  }
  // Load identity from local storage an set up in a local variable
  _initializeIdentity(){
      let identity = JSON.parse(localStorage.getItem('identity'));
      if(identity!=undefined){
          this.identity = identity
      }else{
          this.identity = null;
          this._autoLogout();
      }
  }

 
  // Make a login request
  doLogin(userdata: any) {
      return this.http.post(`${environment.apiUrl}auth/login`, userdata).map( extractData );
  }

  // Set up identity on a local storage and set up in local variable
  setIdentity(user: any) {
      localStorage.setItem('identity', JSON.stringify(user));
      this._initializeIdentity();
  }

  // Set up token on a local storage and setup in a local variable
  setToken(token: string) {
      localStorage.setItem('token', token);
      this._initializeToken();
  }

  // Return identity from local variable
  getIdentity(): any{
      return this.identity;
  }

  // Return token from local variable
  getToken(): string{
      return this.token;
  }

  // Validate current token if isn't expired
  validate_token() {

      let headers = new Headers({'Authorization':this.getToken()});
      let requestOptions = new RequestOptions({headers : headers});

      var response = this.http.get(`${environment.apiUrl}auth/validate-token`, requestOptions).map( extractData).subscribe(
          (data) => { 
              if(data['valid']){
                  this.setIdentity(data['user']);
                  this._permissions_slugs = data['_permissions'];
                  return true;
              } else {
                  this.doLogout();
                  return false;
              }
          },
          (err) => { return false; }
      );
  }

  _autoLogout() {
      if ( this.router.url !== '/' ) {
          this.router.navigate(['/']);
      }
  }

  // Validate if user is logged in
  validateLogged() {
      if(!this.identity || !this.identity._id || !this.token || this.token.length==0){
          this.doLogout();
      }
  }

  // Redirect if user is logged in
  redirectLogin() {
      if (this.identity && this.identity._id && this.token && this.token.length>0){
          setTimeout( () => {
              this.router.navigate(['/admin']);
          }, 300);
      }
  }



  // Clear data and redirect
  doLogout(){
      localStorage.removeItem('identity');
      localStorage.removeItem('token');
      this.token = null;
      this.identity = null;
      this._permissions = [];
      this._permissions_slugs = [];
      this.build = false;
      this.router.navigate(['/']);
      
  }

  goBack() {
      window.history.back();
  }

  displayMessage(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 2000,
    });
  }

  

  
}


function extractData(res: Response): Object {
  let body = res.json();
  return body;
}

