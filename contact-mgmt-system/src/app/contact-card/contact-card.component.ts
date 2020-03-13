import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from '../shared/contacts.service';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent implements OnInit {
@Input() contactNutShell;
@Input() contacts;
  constructor(private router: Router, private contactService: ContactsService) { }

  ngOnInit(): void {
  }
  editContact(contactEmail) {
this.router.navigate(['/edit-contact'], { queryParams: { email: contactEmail } })
  }
  deleteContact(contact) {
this.contactService.deleteContact(contact, this.contacts).subscribe((response) => {
if(response.message === "post is successful") {
  alert("contact deleted successfully");
  this.router.navigate(["/home"]);

}
}, (error) => {
  alert("unable to delete the contact please try later!");
  this.router.navigate(["/home"]);
});
  }
}
