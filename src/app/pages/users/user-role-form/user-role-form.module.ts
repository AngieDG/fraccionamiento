import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule,  MatTableModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';


import { FuseSharedModule } from '@fuse/shared.module';
import { UserRoleFormComponent } from './user-role-form.component';

import { MatToolbarModule } from '@angular/material/toolbar';


const routes = [
    {
        path     : 'user-roles-form',
        component: UserRoleFormComponent
    }
];

@NgModule({
    declarations: [
        UserRoleFormComponent 
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        FuseSharedModule,
        MatToolbarModule
    ]
})
export class UserRoleFormModule
{
}
