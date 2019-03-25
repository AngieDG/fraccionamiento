import { Component, OnInit, Inject, ViewEncapsulation  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Role } from 'app/models/roles.model';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'app/services/auth/login.service';

@Component({
  selector: 'app-user-role-form',
  templateUrl: './user-role-form.component.html',
  styleUrls: ['./user-role-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserRoleFormComponent implements OnInit {

  dialogTitle: string;
  action: any;
  contactForm: FormGroup;
  rol: Role;
  

  constructor(
    public dialogRef: MatDialogRef<UserRoleFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    public loginService: LoginService
  ) {

    this.action = data.action;

    if ( this.action === 'edit' )
        {
          this.dialogTitle = 'Editar Rol';
        }
        else
        {
          this.dialogTitle = 'Nuevo Rol';
          this.rol = new Role({});
      }

      this.contactForm = this.createContactForm();

  
  } 

  ngOnInit() {
  }

  createContactForm()
  {
      
      return this.formBuilder.group({
          _id: [this.rol._id],
          name: [this.rol.name],
          slug: [this.rol.slug],
          _permissions: [this.rol._permissions]
      });
  }
  close(){
    if (true){
      this.dialogRef.close({
        name: this.contactForm.get('name').value,
        slug: this.contactForm.get('slug').value,
      });
    }
  }

}
