import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {EditOrCreateFormComponent} from "../edit-or-create-form/edit-or-create-form.component";
import {ContactListMain} from '../../models/contact-list-main.model';
import {SearchFormComponent} from "../search-from/search-form.component";
import {ContactsService} from "../../services/contacts.service";
@Component({
  selector: 'app-contact-list',
  standalone: true,
    imports: [
        NgForOf,
        RouterLink,
        EditOrCreateFormComponent,
        NgIf,
        SearchFormComponent,
    ],
  providers: [EditOrCreateFormComponent],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})

export class ContactListComponent implements OnInit{
  @ViewChild(EditOrCreateFormComponent) editFormComponent: EditOrCreateFormComponent | undefined;

  contacts:ContactListMain[] = [];
  filteredContacts: ContactListMain[] = [];
  receivedValue: string = '';

  constructor(private contactsService: ContactsService) {
  }

  ngOnInit(): void {
    this.loadContacts();
    this.searchContacts();
  }

  handleValue(value: string): void {
    this.receivedValue = value;
    this.searchContacts(value);
  }

  searchContacts(query: string = ""): void {
    if(query.length === 0){
      this.filteredContacts = this.contacts;
    } else {
      const isPhone = /^\d+$/.test(query);
      if (isPhone) {
        this.filteredContacts = this.contacts.filter(contact =>
          contact.phone.includes(query)
        );
      } else {
        this.filteredContacts = this.contacts.filter(contact =>
          (contact.firstName.toLowerCase().includes(query.toLowerCase()) ||
            contact.lastName.toLowerCase().includes(query.toLowerCase()))
        );
    }
    }
  }

  openModal() {
    if (this.editFormComponent) {
      this.editFormComponent.openContactForm();
    }
  }

  loadContacts() {
      this.contacts = this.contactsService.getContacts();
  }

  handleNewContacts (value: boolean): void {
    if(value){
      this.loadContacts();
    }
  }

  deleteContact(contact: any): void {
    const confirmed = confirm(`Ви впевнені, що хочете видалити ${contact.firstName} ${contact.lastName}?`);
    if (confirmed) {
      this.contacts = this.contacts.filter(c => c !== contact);
      localStorage.setItem('contacts', JSON.stringify(this.contacts));
    }
  }
}
