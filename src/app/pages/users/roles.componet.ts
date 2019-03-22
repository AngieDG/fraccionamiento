import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Sort } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { RoleService } from 'app/services/roles/role.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'app/services/auth/login.service';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';

@Component ({
  selector: 'app-users-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  animations   : fuseAnimations,
  encapsulation: ViewEncapsulation.None,
  providers: [RoleService]
})
export class UserRolesPermissionsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // Mat-Table
  displayedColumns: string[] = ['name', 'btn'];  
  dataSource: MatTableDataSource<any>;

  dialogRef: any;

  role: any[];

  constructor(
    private rolService: RoleService,
    public dialog: MatDialog,
    private router: Router,
    private _fuseProgressBarService: FuseProgressBarService,
    public loginService: LoginService
  ) { }

  ngOnInit() {
  if(!this.loginService.hasPermission(['user-roles-read'])){
      
  }
    this._fuseProgressBarService.show();
    this.rolService.getAll().subscribe((response) => { 
        if(response){
          this.role = response;
          this.dataSource = new MatTableDataSource(response); 
          setTimeout(() => {        
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this._fuseProgressBarService.hide();
          },100);
        }
        
        else{
          this.loginService.displayMessage('Ha ocurrido un error al obtener los roles');
          this.loginService.goBack();
        } 
     

      }
     ,
      (error) =>  {
        this.loginService.displayMessage('Ha ocurrido un error al obtener los roles 1');
        this.loginService.goBack();
        console.log(`Error ${error}`);
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }  
  /*

  addNewRole(){
    this.dialogRef = this.dialog.open(UserRoleFormComponent, {
      panelClass: 'contact-form-dialog',
      width: '450px',
      data      : {
          action: 'new',
      }
    });

    this.dialogRef.afterClosed()
    .subscribe((response: any) => {
        if ( !response )
        {
            return;
        }else{
            this.saveRole(response);
        }

    });

  }

  saveRole(role){
    if (!this.loginService.hasPermission('users-role-create')){
      return this.loginService.displayMessage('Usuario no autorizado.'); 
    }
    this.rolService.saveOrUpdate(role).subscribe(
      (role) => {
        this.loginService.displayMessage('El rol ha sido creado correctamente.');
        this.router.navigate([`/admin/user/roles/${role._id}`]);
      },
      (error) => {
        this.loginService.displayMessage('Ha ocurrido un error al crear el rol.');
        console.log(`Error: ${error}`);
      }
    );
  } */
}
