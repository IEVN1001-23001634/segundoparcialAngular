import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaZodiaco } from './lista-zodiaco';

describe('ListaZodiaco', () => {
  let component: ListaZodiaco;
  let fixture: ComponentFixture<ListaZodiaco>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaZodiaco],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaZodiaco);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
