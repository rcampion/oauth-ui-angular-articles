import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { ErrorComponent } from '../error/error.component';
import { EmailComponent } from '../email/email.component';
import { LoginRouteGuard } from '../common/login.guard';
import { RegistrationComponent } from '../registration/registration.component';
import { UserContactsListComponent } from '../user-contacts/user-contacts-list/user-contacts-list.component';
import { PasswordComponent } from '../password/password.component';

const routes: Routes = [
    { path: '', redirectTo: '/about', pathMatch: 'full' },
    { path: 'register', component: RegistrationComponent },
    { path: 'about', component: AboutComponent },
    { path: 'error', component: ErrorComponent },
    { path: 'email/:id', component: EmailComponent },
    { path: 'password', component: PasswordComponent, canActivate: [LoginRouteGuard] },
    { path: 'user-contacts', component: UserContactsListComponent, canActivate: [LoginRouteGuard] },
    { path: 'home',
        loadChildren: () => import("./../home/home.module").then(m => m.HomeModule)},
    { path: 'users',
        loadChildren: () => import("./../users/users.module").then(m => m.UsersModule), canActivate: [LoginRouteGuard] },
    { path: 'contact',
        loadChildren: () => import("./../contact/contact.module").then(m => m.ContactModule), canActivate: [LoginRouteGuard]},
    { path: 'group',
        loadChildren: () => import("./../group/group.module").then(m => m.GroupModule), canActivate: [LoginRouteGuard]},
    { path: 'settings',
        loadChildren: () => import("./../settings/settings.module").then(m => m.SettingsModule), canActivate: [LoginRouteGuard]},
    { path: 'profile',
        loadChildren: () => import("./../profile/profile.module").then(m => m.ProfileModule), canActivate: [LoginRouteGuard]},
    { path: 'editor',
        loadChildren: () => import("./../editor/editor.module").then(m => m.EditorModule), canActivate: [LoginRouteGuard]},
    { path: 'article',
        loadChildren: () => import("./../article/article.module").then(m => m.ArticleModule)}
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules
        })],
    exports: [RouterModule]
})
export class AppRoutingModule { }

