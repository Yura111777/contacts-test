import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ContactsService} from "../../services/contacts.service";
import {ContactListFull} from "../../models/contact-list-full.model";
import {Contact} from "../../models/contact.model";
import {EditOrCreateFormComponent} from "../edit-or-create-form/edit-or-create-form.component";

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [
    EditOrCreateFormComponent
  ],
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.scss'
})
export class ContactDetailComponent implements OnInit{
  @ViewChild(EditOrCreateFormComponent) editFormComponent: EditOrCreateFormComponent | undefined;

  contactId: string | null = null;
  contact:Contact = {} as Contact;

  constructor(private route: ActivatedRoute, private contactsService: ContactsService) {}

  ngOnInit(): void {
    this.contactId = this.route.snapshot.paramMap.get('id');
    this.setUser();
  }

  setUser() {
    const list:ContactListFull[] = this.contactsService.getContacts();
    const index = list.findIndex(contact => contact.id === this.contactId);
    this.contact = list[index];
  }

  openModal() {
    if (this.editFormComponent) {
      this.editFormComponent.editContact(this.contact);
    }
  }

  handleEditingUser(list:ContactListFull[]){
    const index = list.findIndex(contact => contact.id === this.contactId);
    this.contact = list[index];
  }
}
