import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ContactsService } from '../contacts.service';
import { Contact } from '../Contact';
export function validateEmail(contactService: ContactsService, contacts: Contact[], queryEmail?): ValidatorFn {
return (control: AbstractControl)=> {
  if (queryEmail && queryEmail.email === control.value) {
    return null;
  }  
  if (contactService.isContactExist({email : control.value}, contacts) && control.valid) {
      return { validEmail: true };
    }
    return null;
  }
}