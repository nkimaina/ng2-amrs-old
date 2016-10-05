import { Routes } from '@angular/router';

import { AboutRoutes } from './about/index';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  ...AboutRoutes
];
