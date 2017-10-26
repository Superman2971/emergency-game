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
import { AdministratorButtonComponent } from './buttons/administrator/administrator-button.component';
import { BedButtonComponent } from './buttons/Bed/bed-button.component';
import { CrisisButtonComponent } from './buttons/crisis/crisis-button.component';
import { ERDoctorButtonComponent } from './buttons/er-doctor/er-doctor-button.component';
import { TreatButtonComponent } from './buttons/treat/treat-button.component';
import { ProcessButtonComponent } from './buttons/process/process-button.component';
import { ReceptionistButtonComponent } from './buttons/receptionist/receptionist-button.component';
import { SpecialistButtonComponent } from './buttons/specialist/specialist-button.component';
import { SurgeonButtonComponent } from './buttons/surgeon/surgeon-button.component';
import { SurgeryButtonComponent } from './buttons/surgery/surgery-button.component';
import { DiagnoseButtonComponent } from './buttons/diagnose/diagnose-button.component';
import { WingButtonComponent } from './buttons/wing/wing-button.component';

@NgModule({
  declarations: [
    AppComponent,
    StoryComponent,
    ButtonsContainerComponent,
    StatsComponent,
    // Buttons
    AdministratorButtonComponent,
    BedButtonComponent,
    CrisisButtonComponent,
    ERDoctorButtonComponent,
    TreatButtonComponent,
    ProcessButtonComponent,
    ReceptionistButtonComponent,
    SpecialistButtonComponent,
    SurgeonButtonComponent,
    SurgeryButtonComponent,
    DiagnoseButtonComponent,
    WingButtonComponent,
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
