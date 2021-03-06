import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RoleService } from 'app/services/roles/role.service';
import { PermissionsService } from 'app/services/roles/permissions.services';
import { Role } from 'app/models/roles.model';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import { LoginService } from 'app/services/auth/login.service';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';


@Component({
  selector: 'app-user-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss'],
  providers: [RoleService, PermissionsService]
})

export class UserPermissionsComponent implements OnInit {
  
  _id: string;

  permissions: any[];
  role: any = [];
  errorMessage: String = '';

  current_role: Role;


  constructor( 
    public loginService: LoginService,
    private route: ActivatedRoute,
    private roleService: RoleService,
    private permissionsService: PermissionsService,
    private _fuseProgressBarService: FuseProgressBarService,
    private toastrService: ToastrService
  ) {
    this.route.params.subscribe(
      (params) => {
        if (params['_id']){
          this._id = params['_id'];
        }
      }
    );
   }

  ngOnInit() {
  
    this._fuseProgressBarService.show();
    this.roleService.getRoleById(this._id).subscribe((response) => {
        this.current_role = response;
        this._fuseProgressBarService.hide();
    },
    (error) => {
      this._fuseProgressBarService.hide();
      console.log(error);
    });

    this.permissionsService.getAll().subscribe((response) => {
       this.permissions = response; 
    },
    (error) => {
      console.log(error);
    });
  
  }


  addOrRemovePermission(checked, idRole){
    // If checked
    if ( checked ){
      if ( this.current_role['_permissions'].indexOf(idRole) < 0 ) {
        this.current_role['_permissions'].push(idRole);
      }
    } else {
      this.current_role['_permissions'].splice(this.current_role['_permissions'].indexOf(idRole), 1);
    }
  }

  saveRole(){

    this._fuseProgressBarService.show();
    this.roleService.saveOrUpdate(this.current_role).subscribe(
      (response) => {
          this._fuseProgressBarService.hide();
          if  (response.message){
            console.log( response );
          }  else{
          }
      },
      (error) => {
        this._fuseProgressBarService.hide();
        console.log(`Error: ${error} `);
   
      }
    );
  }

  deleteRole(){
    if ( confirm('¿Estás seguro de eliminar el rol?') ) {
      this._fuseProgressBarService.show();
      this.roleService.delete(this.current_role).subscribe(
        (response) => {
            this._fuseProgressBarService.hide();
            if  (response.message){
              console.log(response.message);
            }  else{
            }
        },
        (error) => {
          console.log(`Error: ${error} `);
        }
      );
    }
  }


  setActiveRole(role) {
    this.current_role = _.cloneDeep(role);
  }




}
