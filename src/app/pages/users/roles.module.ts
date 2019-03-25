import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule,  MatTableModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';


import { FuseSharedModule } from '@fuse/shared.module';
import { UserRolesPermissionsComponent } from './roles.componet';

import { UserRoleFormModule } from './user-role-form/user-role-form.module';
import { MatDialogModule } from '@angular/material/dialog';
import { UserPermissionsComponent } from './permissions/permissions.component';
import { ToastrModule } from 'ngx-toastr';

const routes = [
    {
        path     : 'admin/user/roles',
        component: UserRolesPermissionsComponent,
        pathMatch: 'full'
    },
    {
        path     : 'admin/user/roles/:_id',
        component: UserPermissionsComponent
    }
];


@NgModule({
    declarations: [
        UserRolesPermissionsComponent,
        UserPermissionsComponent 
    ],
    imports     : [
        RouterModule.forChild(routes),
        ToastrModule.forRoot(), // ToastrModule added
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        FuseSharedModule,
        UserRoleFormModule,
        MatDialogModule,
    ],
    exports     : [
        UserRolesPermissionsComponent,
        UserRoleFormModule
    ]
})
export class UserRolesPermissionsModule
{
}
