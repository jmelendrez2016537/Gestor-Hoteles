import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAdminHotelComponent } from './registro-admin-hotel.component';

describe('RegistroAdminHotelComponent', () => {
  let component: RegistroAdminHotelComponent;
  let fixture: ComponentFixture<RegistroAdminHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroAdminHotelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroAdminHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
