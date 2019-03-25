import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatTableModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';


import { FuseSharedModule } from '@fuse/shared.module';

import { UserComponent } from './user.component';

// Modules

import { UserRolesPermissionsModule }from 'app/pages/users/roles.module';

import { AuthGuard } from 'app/pages/auth/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { UserFormComponent } from './user-form/user-form.component';

import { UsersService } from 'app/services/roles/user.service';

import { MatDatepickerModule } from '@angular/material/datepicker';


const routes = [
    {
        path     : 'admin/user/users',
        CanActivate: [AuthGuard],
        component: UserComponent
    }

];

@NgModule({
    declarations: [
        UserComponent,
       
    ],
    imports     : [
        RouterModule.forChild(routes),
        BrowserAnimationsModule,
        UserRolesPermissionsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSidenavModule,
        MatListModule,
        FuseSharedModule,
        MatToolbarModule,
        MatSelectModule,
        MatTableModule,
        MatPaginatorModule,
        MatDatepickerModule

    ],
    providers : [
        UsersService
    ],
})
export class UserModule
{
}
