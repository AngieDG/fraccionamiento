import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { DashboardComponent } from 'app/pages/dashboard/dashboard.component';

import { AuthGuard } from 'app/pages/auth/auth.guard';

const routes = [
    {
        path     : 'admin/dashboard',
        canActivate: [AuthGuard],
        component: DashboardComponent
    }
];

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule
    ],
    providers: [AuthGuard]
})
export class DashboardModule
{
}
