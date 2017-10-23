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
// Button Components
import { AdministratorButtonComponent } from './buttons/administrator/administrator-button.component';
import { BedButtonComponent } from './buttons/Bed/bed-button.component';
import { CrisisButtonComponent } from './buttons/crisis/crisis-button.component';
import { ERDoctorButtonComponent } from './buttons/er-doctor/er-doctor-button.component';
import { HealButtonComponent } from './buttons/heal/heal-button.component';
import { ProcessButtonComponent } from './buttons/process/process-button.component';
import { ReceptionistButtonComponent } from './buttons/receptionist/receptionist-button.component';
import { SpecialistButtonComponent } from './buttons/specialist/specialist-button.component';
import { SurgeonButtonComponent } from './buttons/surgeon/surgeon-button.component';
import { SurgeryButtonComponent } from './buttons/surgery/surgery-button.component';
import { TriageButtonComponent } from './buttons/triage/triage-button.component';
import { WingButtonComponent } from './buttons/wing/wing-button.component';

@NgModule({
  declarations: [
    AppComponent,
    StoryComponent,
    Room1Component,
    // Buttons
    AdministratorButtonComponent,
    BedButtonComponent,
    CrisisButtonComponent,
    ERDoctorButtonComponent,
    HealButtonComponent,
    ProcessButtonComponent,
    ReceptionistButtonComponent,
    SpecialistButtonComponent,
    SurgeonButtonComponent,
    SurgeryButtonComponent,
    TriageButtonComponent,
    WingButtonComponent,
    // Pipe
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
