import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactCardComponent } from './contact-card/contact-card.component';
import { ContactListsComponent } from './contact-lists/contact-lists.component';
import { ContactsService } from './shared/contacts.service';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { RegistrationFormComponent } from './shared/registration-form/registration-form.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactCardComponent,
    ContactListsComponent,
    EditContactComponent,
    RegistrationFormComponent,
    AddContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ContactsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
