import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {PlayerListPage} from "./player-list";
const routes: Routes = [
  {
    path: '',
    component: PlayerListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerListPageRoutingModule {}
