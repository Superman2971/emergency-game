import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Services
import { BroadcasterService } from './services/broadcaster.service';
// Pipes
import { ReversePipe } from './pipes/reverse.pipe';
// Components
import { AppComponent } from './app.component';
import { StoryComponent } from './story/story.component';
import { Room1Component } from './room1/room1.component';

@NgModule({
  declarations: [
    AppComponent,
    StoryComponent,
    Room1Component,
    ReversePipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    BroadcasterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
