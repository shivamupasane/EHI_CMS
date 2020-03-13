import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../shared/contacts.service';
import { Contact } from '../shared/Contact';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contact-lists',
  templateUrl: './contact-lists.component.html',
  styleUrls: ['./contact-lists.component.scss']
})
export class ContactListsComponent implements OnInit {
 contactLists: Contact[] = []
  constructor(private contactservice : ContactsService, private router: Router) { }

  ngOnInit(): void {
    this.contactservice.getContacts().subscribe((data) => {
      this.contactLists = data.contacts;
      if(this.contactLists && this.contactLists.length === 0) {
        alert("no record found! Add new contact");
        this.router.navigate(["/add-contact"]);
          }}, (error) => {
      alert("unable to get contacts at this moment please try later!")
      this.router.navigate(["/home"]);
          });

}
}
