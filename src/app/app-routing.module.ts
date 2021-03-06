import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tutorial',
    pathMatch: 'full'
  },
  {
    path: 'account',
    loadChildren: './pages/account/account.module#AccountModule'
  },
  {
    path: 'support',
    loadChildren: './pages/support/support.module#SupportModule'
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginModule'
  },
  {
    path: 'signup',
    loadChildren: './pages/signup/signup.module#SignUpModule'
  },
  {
    path: 'app',
    loadChildren: './pages/tabs-page/tabs-page.module#TabsModule'
  },
  {
    path: 'tutorial',
    loadChildren: './pages/tutorial/tutorial.module#TutorialModule'
  }
  // ,
  // {
  //   path: 'player-detail',
  //   loadChildren: './pages/player-detail/player-detail.module#PlayerDetailPageModule'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
