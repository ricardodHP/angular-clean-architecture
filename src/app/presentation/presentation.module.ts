import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToDoListComponent} from './to-do-list/to-do-list.component';
import {CoreModule} from '../core/core.module';
import {DataModule} from '../data/data.module';


@NgModule({
  declarations: [ToDoListComponent],
  exports: [
    ToDoListComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    DataModule
  ]
})
export class PresentationModule {
}
