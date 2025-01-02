import { Injectable } from '@angular/core';
import {ContactListFull} from "../models/contact-list-full.model";

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor() {
  }

  getContacts(): ContactListFull[] {
    const storedContacts = localStorage.getItem('contacts');
      if(storedContacts) {
        return JSON.parse(storedContacts);
      } else {
        return []
      }
  }
}
