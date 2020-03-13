import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../shared/contacts.service';
import { Contact } from '../shared/Contact';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}
