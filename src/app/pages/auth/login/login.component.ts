import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { LoginService } from 'app/services/auth/login.service';

import { ToastrService } from 'ngx-toastr';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';


@Component({
    selector     : 'login',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;

    errorMessage: string = '';
    loading: boolean= false;


    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        public loginService: LoginService,
        private toastr: ToastrService,
        private _fuseProgressBarService: FuseProgressBarService
    )
    {
        
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    loginUser(){
        this.loading = true;
        this.errorMessage = '';
        // Show loading
        this._fuseProgressBarService.show();
        this.loginService.doLogin({ email: this.loginForm.get('email').value, password: this.loginForm.get('password').value }).subscribe(
          data => {
            if(data['token']){
                // Store token
                this.loginService.setIdentity(data['user']);
                this.loginService.setToken(data['token']);
                this.loginService.redirectLogin();
                this.loading = false;
                this._fuseProgressBarService.hide();
              } else {
                this.errorMessage = 'Usuario no autorizado.';
                this.toastr.warning(this.errorMessage);
                this.loading = false;
                this._fuseProgressBarService.hide();
              }
          },
          e => {
            alert('Ha ocurrido un error inesperado al iniciar sesión');
            this.errorMessage = e;
            this.loading = false;
            this._fuseProgressBarService.hide();
          }
        );

    }

}
