import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateDriverComponent } from './admin-create-driver.component';

describe('AdminCreateDriverComponent', () => {
  let component: AdminCreateDriverComponent;
  let fixture: ComponentFixture<AdminCreateDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCreateDriverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCreateDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
