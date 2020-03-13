import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { validateEmail } from '../validators/email.validator';
import { ContactsService } from '../contacts.service';
import { Router } from '@angular/router';
import { Contact } from '../Contact';
import {Location} from '@angular/common';
@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  @Input() emailValRoute;
  registrationForm: FormGroup;
  contacts: Contact[] = [];
  contact: Contact;
  isContentLoaded: boolean = false;
  constructor(private contactService: ContactsService, private fb: FormBuilder, private router: Router, private location: Location) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: [{value: '', disabled: true}, [Validators.pattern('[a-zA-Z ]*'), Validators.required]],
      lastName: [{value: '', disabled: true}, [Validators.pattern('[a-zA-Z ]*'), Validators.required]],
      phoneNo: [{value: '', disabled: true}, [Validators.pattern('[0-9]*'), Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: [{value: '', disabled: true}, [Validators.required, Validators.email]],
      status: [{value: 'Active', disabled: true}],
    });
    this.contactService.getContacts().subscribe((data) => {
      this.contacts = data.contacts;
      if(this.emailValRoute) {
        this.contact = this.contactService.isContactExist(this.emailValRoute, this.contacts);
      }
      if(this.emailValRoute && !this.contact) {
alert("no such record found!, please add new contact!!");
this.router.navigate(["/add-contact"]);      
}
  
      if (this.contact) {
        Object.keys(this.contact).forEach((key) => {
          if (this.registrationForm.controls.hasOwnProperty(key)) {
            this.registrationForm.controls[key].setValue(this.contact[key]);
          }
        });
      }
      this.registrationForm.enable();
      this.email.setValidators([ Validators.required, Validators.email, validateEmail(this.contactService, this.contacts, this.emailValRoute)]);
      this.email.updateValueAndValidity();
      this.isContentLoaded  = true;
          }, (error) => {
            alert("some error occured, please try later!");
            this.router.navigate(["/home"]);
          });
    this.registrationForm.get('status').valueChanges.subscribe(checkedValue => {
      if (checkedValue === "Inactive") {
          let val = prompt("Do you really want to deactivate the contact - Y/N");
          if (!val || val.toUpperCase() === "N") {
            this.registrationForm.controls.status.setValue('Active');
          }
      }
    });
  }
  get firstName() {
    return this.registrationForm.get('firstName');
  }
  get lastName() {
    return this.registrationForm.get('lastName');
  }
  get phoneNo() {
    return this.registrationForm.get('phoneNo');
  }
  get email() {
    return this.registrationForm.get('email');
  }
  onSubmit() {
    this.registrationForm.markAllAsTouched();
    if (this.registrationForm.valid && this.isContentLoaded) {
      this.emailValRoute = this.emailValRoute || this.registrationForm.get('email').value;
      this.contactService.setContact(this.registrationForm.value, this.emailValRoute, this.contacts).subscribe((response) => {
        if(response.message === "post is successful") {
          alert("contact details submitted succesfully");
      this.router.navigate(['/contact-lists'])
        
        }
      }, (error) => {
        alert("some error occured, please try later!");
        this.router.navigate(["/home"]);
      });
     
    } else {
      if(!this.isContentLoaded) {
        alert("some error occured, please try later!");
        this.router.navigate(["/home"]);
      } else {
        alert("please correct the highlighted fields before submitting");
      }
      
    }
  }
  backClicked() {
    this.location.back();
  }

}
