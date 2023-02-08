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
    component.form.get('name')?.setValue("Uros");
    component.form.get('lastname')?.setValue("Drenovic");
    component.form.get('phone')?.setValue("58295925");
    component.form.get('email')?.setValue("vilaSTrebevica@mail.com");
    component.form.get('address')?.setValue("Kraj Vrbasa vode hladne");
    component.form.get('vehicle_model')?.setValue("Kako god ga sastavis, ispadne kalasnjikov");
    component.form.get('vehicle_license')?.setValue("VB 1941 BH");
    component.form.get('vehicle_detail')?.setValue(4);
  
    expect(component.form.valid).toBeTruthy();
  });

  it('form should be invalid when name is not provided', () => {
    component.form.get('lastname')?.setValue("Drenovic");
    component.form.get('phone')?.setValue("58295925");
    component.form.get('email')?.setValue("vilaSTrebevica@mail.com");
    component.form.get('address')?.setValue("Kraj Vrbasa vode hladne");
    component.form.get('vehicle_model')?.setValue("Kako god ga sastavis, ispadne kalasnjikov");
    component.form.get('vehicle_license')?.setValue("VB 1941 BH");
    component.form.get('vehicle_detail')?.setValue(4);
  
    expect(component.form.valid).toBeFalsy();
  });

  it('form should be invalid when lastname is not provided', () => {
    component.form.get('name')?.setValue("Uros");
    component.form.get('phone')?.setValue("58295925");
    component.form.get('email')?.setValue("vilaSTrebevica@mail.com");
    component.form.get('address')?.setValue("Kraj Vrbasa vode hladne");
    component.form.get('vehicle_model')?.setValue("Kako god ga sastavis, ispadne kalasnjikov");
    component.form.get('vehicle_license')?.setValue("VB 1941 BH");
    component.form.get('vehicle_detail')?.setValue(4);
  
    expect(component.form.valid).toBeFalsy();
  });

  it('form should be invalid when phone is not provided', () => {
    component.form.get('name')?.setValue("Uros");
    component.form.get('lastname')?.setValue("Drenovic");
    component.form.get('email')?.setValue("vilaSTrebevica@mail.com");
    component.form.get('address')?.setValue("Kraj Vrbasa vode hladne");
    component.form.get('vehicle_model')?.setValue("Kako god ga sastavis, ispadne kalasnjikov");
    component.form.get('vehicle_license')?.setValue("VB 1941 BH");
    component.form.get('vehicle_detail')?.setValue(4);
  
    expect(component.form.valid).toBeFalsy();
  });

  it('form should be invalid when email is not provided', () => {
    component.form.get('name')?.setValue("Uros");
    component.form.get('lastname')?.setValue("Drenovic");
    component.form.get('phone')?.setValue("58295925");
    component.form.get('address')?.setValue("Kraj Vrbasa vode hladne");
    component.form.get('vehicle_model')?.setValue("Kako god ga sastavis, ispadne kalasnjikov");
    component.form.get('vehicle_license')?.setValue("VB 1941 BH");
    component.form.get('vehicle_detail')?.setValue(4);
  
    expect(component.form.valid).toBeFalsy();
  });

  it('form should be invalid when address is not provided', () => {
    component.form.get('name')?.setValue("Uros");
    component.form.get('lastname')?.setValue("Drenovic");
    component.form.get('phone')?.setValue("58295925");
    component.form.get('email')?.setValue("vilaSTrebevica@mail.com");
    component.form.get('vehicle_model')?.setValue("Kako god ga sastavis, ispadne kalasnjikov");
    component.form.get('vehicle_license')?.setValue("VB 1941 BH");
    component.form.get('vehicle_detail')?.setValue(4);
  
    expect(component.form.valid).toBeFalsy();
  });

  it('form should be invalid when vehicle_model is not provided', () => {
    component.form.get('name')?.setValue("Uros");
    component.form.get('lastname')?.setValue("Drenovic");
    component.form.get('phone')?.setValue("58295925");
    component.form.get('email')?.setValue("vilaSTrebevica@mail.com");
    component.form.get('address')?.setValue("Kraj Vrbasa vode hladne");
    component.form.get('vehicle_license')?.setValue("VB 1941 BH");
    component.form.get('vehicle_detail')?.setValue(4);
  
    expect(component.form.valid).toBeFalsy();
  });

  it('form should be invalid when vehicle_license is not provided', () => {
    component.form.get('name')?.setValue("Uros");
    component.form.get('lastname')?.setValue("Drenovic");
    component.form.get('phone')?.setValue("58295925");
    component.form.get('email')?.setValue("vilaSTrebevica@mail.com");
    component.form.get('address')?.setValue("Kraj Vrbasa vode hladne");
    component.form.get('vehicle_model')?.setValue("Kako god ga sastavis, ispadne kalasnjikov");
    component.form.get('vehicle_detail')?.setValue(4);
  
    expect(component.form.valid).toBeFalsy();
  });

  it('form should be invalid when vehicle_detail is not provided', () => {
    component.form.get('name')?.setValue("Uros");
    component.form.get('lastname')?.setValue("Drenovic");
    component.form.get('phone')?.setValue("58295925");
    component.form.get('email')?.setValue("vilaSTrebevica@mail.com");
    component.form.get('address')?.setValue("Kraj Vrbasa vode hladne");
    component.form.get('vehicle_model')?.setValue("Kako god ga sastavis, ispadne kalasnjikov");
    component.form.get('vehicle_license')?.setValue("VB 1941 BH");
  
    expect(component.form.valid).toBeFalsy();
  });

  it('form should be invalid when email is missing @', () => {
    component.form.get('name')?.setValue("Uros");
    component.form.get('lastname')?.setValue("Drenovic");
    component.form.get('phone')?.setValue("58295925");
    component.form.get('email')?.setValue("vilaSTrebevicamail.com");
    component.form.get('address')?.setValue("Kraj Vrbasa vode hladne");
    component.form.get('vehicle_model')?.setValue("Kako god ga sastavis, ispadne kalasnjikov");
    component.form.get('vehicle_license')?.setValue("VB 1941 BH");
    component.form.get('vehicle_detail')?.setValue(4);
  
    expect(component.form.valid).toBeFalsy();
  });

  it('form should be invalid when vehicle_detail is smaller than 1', () => {
    component.form.get('name')?.setValue("Uros");
    component.form.get('lastname')?.setValue("Drenovic");
    component.form.get('phone')?.setValue("58295925");
    component.form.get('email')?.setValue("vilaSTrebevica@mail.com");
    component.form.get('address')?.setValue("Kraj Vrbasa vode hladne");
    component.form.get('vehicle_model')?.setValue("Kako god ga sastavis, ispadne kalasnjikov");
    component.form.get('vehicle_license')?.setValue("VB 1941 BH");
    component.form.get('vehicle_detail')?.setValue(0);
  
    expect(component.form.valid).toBeFalsy();
  });

  it('form should be invalid when vehicle_detail is bigger than 10', () => {
    component.form.get('name')?.setValue("Uros");
    component.form.get('lastname')?.setValue("Drenovic");
    component.form.get('phone')?.setValue("58295925");
    component.form.get('email')?.setValue("vilaSTrebevica@mail.com");
    component.form.get('address')?.setValue("Kraj Vrbasa vode hladne");
    component.form.get('vehicle_model')?.setValue("Kako god ga sastavis, ispadne kalasnjikov");
    component.form.get('vehicle_license')?.setValue("VB 1941 BH");
    component.form.get('vehicle_detail')?.setValue(11);
  
    expect(component.form.valid).toBeFalsy();
  });
});
