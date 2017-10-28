import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Services
import { BroadcasterService } from './services/broadcaster.service';
import { PatientService } from './services/patient.service';
import { StatsService } from './services/stats.service';
// Pipes
import { ReversePipe } from './pipes/reverse.pipe';
import { ObjectPipe } from './pipes/object.pipe';
// Components
import { AppComponent } from './app.component';
import { StoryComponent } from './story/story.component';
import { ButtonsContainerComponent } from './buttons-container/buttons-container.component';
import { StatsComponent } from './stats/stats.component';
// Button Components
import { BedButtonComponent } from './buttons/Bed/bed-button.component';
import { ExamineButtonComponent } from './buttons/examine/examine-button.component';
import { TreatButtonComponent } from './buttons/treat/treat-button.component';
import { DiagnoseButtonComponent } from './buttons/diagnose/diagnose-button.component';

@NgModule({
  declarations: [
    AppComponent,
    StoryComponent,
    ButtonsContainerComponent,
    StatsComponent,
    // Buttons
    BedButtonComponent,
    TreatButtonComponent,
    DiagnoseButtonComponent,
    ExamineButtonComponent,
    // Pipe
    ReversePipe,
    ObjectPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    BroadcasterService,
    PatientService,
    StatsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
