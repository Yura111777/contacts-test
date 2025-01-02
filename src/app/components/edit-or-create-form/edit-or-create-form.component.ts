import {AfterViewInit, Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Modal} from "bootstrap";
import {ContactListFull} from "../../models/contact-list-full.model";
import {ContactsService} from "../../services/contacts.service";

@Component({
  selector: 'app-edit-or-create-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  providers: [],
  templateUrl: './edit-or-create-form.component.html',
  styleUrl: './edit-or-create-form.component.scss'
})
export class EditOrCreateFormComponent implements AfterViewInit{
  @ViewChild('contactModal') contactModal: any;
  @Output() contactAdded = new EventEmitter<boolean>();
  @Output() contactWasModify = new EventEmitter<ContactListFull[]>();

  contactForm: FormGroup;
  contacts: ContactListFull[] = [];
  currentContact: any = null;
  modal: Modal | undefined;


  constructor(private fb: FormBuilder, private contactsService: ContactsService) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      birthDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    if (this.contactModal) {
      this.modal = new Modal(this.contactModal.nativeElement);
    }
  }

  openContactForm() {
    this.contactForm.reset();
    this.currentContact = null;
    if (this.modal) {
      this.modal.show();
    }
  }

  editContact(contact: any) {
    this.contactForm.setValue({
      firstName: contact.firstName,
      lastName: contact.lastName,
      phone: contact.phone,
      birthDate: contact.birthDate,
      email: contact.email,
      address: contact.address
    });
    this.currentContact = contact;
    if (this.modal) {
      this.modal.show();
    }
  }

  saveContact() {
    this.contacts = this.contactsService.getContacts();
    if (this.contactForm.valid) {
      const contactData = {
        id: this.currentContact ? this.currentContact.id : Date.now().toString(),
        ...this.contactForm.value
      };
      if (this.currentContact) {
        const index = this.contacts.findIndex(contact => contact.id === this.currentContact.id);
        this.contacts[index] = contactData;
        this.contactWasModify.emit(this.contacts);
      } else {
        this.contacts.push(contactData);
      }

      localStorage.setItem('contacts', JSON.stringify(this.contacts));
      this.contactForm.reset();
      if (this.modal) {
        this.modal.hide();
        this.contactAdded.emit(true);
      }
    }
  }
}
