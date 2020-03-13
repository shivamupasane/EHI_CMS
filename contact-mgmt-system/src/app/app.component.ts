import { Component, OnInit } from '@angular/core';
import { ContactsService } from './shared/contacts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'contact-mgmt-system';
}
