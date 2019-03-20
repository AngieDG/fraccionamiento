import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/pages/auth/auth.guard';

const appRoutes: Routes = [
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },
  { 
    path: 'admin', 
    canActivate: [AuthGuard],
    redirectTo: 'admin/dashboard'
  },
];

@NgModule({
    imports: [
      RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule],
    providers: []
  })
  export class AppRoutingModule {
  }
  