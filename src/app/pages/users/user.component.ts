import { Component, OnInit, AfterViewInit, TemplateRef, ViewChild , ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';

// Component 
//import { UserFormComponent } from 'app/pages/user/user-form/user-form.component';

// Services
import { LoginService } from 'app/services/auth/login.service';
import { UsersService } from 'app/services/roles/user.service';

// Models
import { User } from 'app/models/user.model';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations   : fuseAnimations,
  encapsulation: ViewEncapsulation.None,
  providers: [LoginService]
})
export class UserComponent implements OnInit {


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  displayedColumns: string[] = ['firstname', 'lastname', 'email'];  
  dataSource: MatTableDataSource<any>;

  users: any[];
  dialogRef: any;



  constructor(
    private userService: UsersService,
    private _fuseProgressBarService: FuseProgressBarService,
    public loginService: LoginService
  ) { }

  ngOnInit() {
   
    this._fuseProgressBarService.show();
    this.userService.getAll().subscribe(
      (response) => {
        this.users = response;
        this.dataSource = new MatTableDataSource(this.users); 
        setTimeout(() => {        
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this._fuseProgressBarService.hide();
        },50);
      }
    );
  
   }

    applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
        } 

      
}

