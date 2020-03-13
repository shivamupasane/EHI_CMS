import { Injectable } from '@angular/core';
import { Contact } from './Contact';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
private isContactAlreadyPresent = false;
  constructor(private http: HttpClient) {}
  getContacts(): Observable<any> {
    return this.http.get('/contacts');
  }
  postContacts(contactslist): Observable<any> {
    return this.http.post('/contacts', contactslist);
  }
  deleteContact(contact: Contact, contactsList): Observable<any> {
    let tempContacts = [];
    for(let cntct of contactsList) {
      if(cntct.email !== contact.email) {
        tempContacts.push(cntct);
      }
    }
    contactsList = tempContacts;
    return this.postContacts(tempContacts);
  }
  isContactExist(contact, contactList): Contact {
    for(let cntct of contactList) {
      if(cntct.email === contact.email) {
        return cntct;
      }
    }
    return null;
  }
  setContact(contact, email, contactsList): Observable<any>{
    for(let index in contactsList) {
      if(contactsList[index] && contactsList[index].email === email.email) {
        contactsList[index] = contact;
        this.isContactAlreadyPresent = true;
        break;
      }
    }
    if(!this.isContactAlreadyPresent) {
      contactsList.push(contact);
    }
    return this.postContacts(contactsList);
  }
}
