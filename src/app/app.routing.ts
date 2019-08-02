import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
// Components
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserComponent } from './components/users/user.component';
import { TimeLineComponent } from './components/timeLine/timeLine.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'registro', component: RegisterComponent},
    {path: 'mis-datos', component: UserEditComponent},
    {path: 'gente/:page', component: UserComponent},
    {path: 'gente', component: UserComponent},
    {path: 'timeline', component: TimeLineComponent},
    {path: '**', component: HomeComponent},


];

export const routing: ModuleWithProviders = RouterModule.forChild(appRoutes);
export const appRoutingProviders: any[] = [];

