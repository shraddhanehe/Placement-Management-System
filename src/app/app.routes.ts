import { Routes } from '@angular/router';

import { Dashboard } from './pages/dashboard/dashboard';
import { Companies } from './pages/companies/companies';
import { Applications } from './pages/applications/applications';
import { Profile } from './pages/profile/profile';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard
  },
  {
    path: 'companies',
    component: Companies
  },
  {
    path: 'applications',
    component: Applications
  },
  {
    path: 'profile',
    component: Profile
  },
  {
    path: '**',
    redirectTo: ''
  }
];