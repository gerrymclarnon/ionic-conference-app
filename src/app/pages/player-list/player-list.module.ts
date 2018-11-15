import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { PlayerListPage } from './player-list';
import { PlayerListPageRoutingModule } from './player-list-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PlayerListPageRoutingModule
  ],
  declarations: [PlayerListPage],
})
export class PlayerListModule {}
