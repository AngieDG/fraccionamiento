import { NgModule } from '@angular/core';
//import { Routes, RouterModule } from '@angular/router';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
//import { AuthGuard } from 'app/pages/auth/auth.guard';
const appRoutes: Routes = [
  { 
      path: '', 
      redirectTo: 'role', 
      pathMatch: 'full' 
    },
    { 
      path: '***', 
      redirectTo: 'sample', 
      pathMatch: 'full' 
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
  