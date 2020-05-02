import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AmbientePage } from './ambiente.page';

describe('AmbientePage', () => {
  let component: AmbientePage;
  let fixture: ComponentFixture<AmbientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmbientePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AmbientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
