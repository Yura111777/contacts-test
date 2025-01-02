import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss'
})
export class SearchFormComponent {
  @Output() valueEmitter = new EventEmitter<string>();

  searchContact(e: Event) {
    const inputElement = e.target as HTMLInputElement;
    const inputValue = inputElement?.value;
    this.valueEmitter.emit(inputValue);
  }

}
