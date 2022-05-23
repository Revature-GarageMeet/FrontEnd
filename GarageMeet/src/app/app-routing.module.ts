import { NgModule } from '@angular/core';
import { flush } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
<<<<<<< HEAD
import { PostComponent } from './post/post.component';

const routes: Routes = [
  {path: '', component: LoginComponent  },
  {path: 'login', component: LoginComponent},
  {path: 'post', component: PostComponent},
=======
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: '', component: LoginComponent  },
  {path: 'register', component: RegisterComponent}
>>>>>>> 90d07cd2a424f41f537d9bf356522a958c6f0d84
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
