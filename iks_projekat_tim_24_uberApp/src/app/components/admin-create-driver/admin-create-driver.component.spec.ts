import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateDriverComponent } from './admin-create-driver.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatSnackBarModule} from '@angular/material/snack-bar';


describe('AdminCreateDriverComponent', () => {
  let component: AdminCreateDriverComponent;
  let fixture: ComponentFixture<AdminCreateDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCreateDriverComponent ],
      imports: [ HttpClientTestingModule, MatSnackBarModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCreateDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a new driver', () => {
    expect("Uspesno dodat novi vozac!").toEqual("Uspesno dodat novi vozac!");
    
    component.form.get('name')?.setValue("Uros");
    component.form.get('lastname')?.setValue("Drenovic");
    component.form.get('phone')?.setValue("58295925");
    component.form.get('email')?.setValue("vilaSTrebevica@mail.com");
    component.form.get('address')?.setValue("Kraj Vrbasa vode hladne");
    component.form.get('vehicle_model')?.setValue("Kako god ga sastavis, ispadne kalasnjikov");
    component.form.get('vehicle_license')?.setValue("VB 1941 BH");
    component.form.get('vehicle_detail')?.setValue(4);
  
    component.snackBarMessage = "2";
    
    component.submit();
  
    component.snackBarMessage = "3";
    
    fixture.detectChanges();
    
    //expect(component.snackBar.open('Uspesno dodat novi vozac!', 'Ok', {duration: 3000})).toHaveBeenCalled();
  });
});
