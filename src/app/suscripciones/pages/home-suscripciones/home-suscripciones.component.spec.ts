import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSuscripcionesComponent } from './home-suscripciones.component';

describe('HomeSuscripcionesComponent', () => {
  let component: HomeSuscripcionesComponent;
  let fixture: ComponentFixture<HomeSuscripcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeSuscripcionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSuscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
