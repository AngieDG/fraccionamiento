import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule, MatSnackBarModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';



 
// Routing Module
import { AppRoutingModule } from 'app/app-routing.module';

// Services
import { LoginService } from 'app/services/auth/login.service';


// Pages Modules
import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { LoginModule } from 'app/pages/auth/login/login.module';
import { UserModule } from 'app/pages/users/user.module';



import { ToastrModule } from 'ngx-toastr';

import { AuthGuard } from 'app/pages/auth/auth.guard';




@NgModule({
    declarations: [
        AppComponent,
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(), // ToastrModule added
        HttpModule,
        HttpClientModule,
        AppRoutingModule,

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        LoginModule,
        SampleModule,

        UserModule
    ],
    bootstrap   : [
        AppComponent
    ],
    providers: [
      
      LoginService
      ]
})
export class AppModule
{
}
