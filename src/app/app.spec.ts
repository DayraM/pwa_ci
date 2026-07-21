import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Debe tener el titulo correcto', () => {
    const app = new App();

    expect(app.titulo).toBe('Gestor de Tareas Heliconius');
  });

  it('El título debe contener el nombre de la empresa', () => {
    const app = new App();
    expect(app.titulo).toContain('Heliconius');
  });

});
