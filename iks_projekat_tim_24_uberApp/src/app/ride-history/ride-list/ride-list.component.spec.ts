import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideListComponent } from './ride-list.component';

describe('RideListComponent', () => {
  let component: RideListComponent;
  let fixture: ComponentFixture<RideListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RideListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
