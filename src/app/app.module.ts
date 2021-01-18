import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {DataModule} from './data/data.module';
import {PresentationModule} from './presentation/presentation.module';
import {ToDoListRepository} from './core/repositories/to-do-list-repository';
import {ToDoListWebRepository} from './data/repository/to-do-list-web-repository/to-do-list-web.repository';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    DataModule,
    PresentationModule
  ],
  providers: [{
    provide: ToDoListRepository, useClass: ToDoListWebRepository
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
