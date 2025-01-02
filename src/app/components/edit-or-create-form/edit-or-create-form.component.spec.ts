import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrCreateFormComponent } from './edit-or-create-form.component';

describe('EditOrCreateFormComponent', () => {
  let component: EditOrCreateFormComponent;
  let fixture: ComponentFixture<EditOrCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditOrCreateFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditOrCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
