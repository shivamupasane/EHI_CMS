import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactListsComponent } from './contact-lists/contact-lists.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AddContactComponent } from './add-contact/add-contact.component';


const routes: Routes = [{
  path : 'home', component : HomeComponent
},
{
  path : 'contact-lists', component : ContactListsComponent
},
{
  path : 'edit-contact', component : EditContactComponent
},
{
  path : 'add-contact', component : AddContactComponent
},
{path: '**', redirectTo: 'home', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserModule, CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
