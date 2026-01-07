import { ComponentFixture, TestBed } from '@angular/core/testing';

// 1. On importe le bon nom de la classe (AboutComponent)
import { AboutComponent } from './about';

describe('AboutComponent', () => {
  // 2. On met à jour le type de la variable
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // 3. On met à jour l'import du module de test
      imports: [AboutComponent],
    }).compileComponents();

    // 4. On crée le bon composant
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
