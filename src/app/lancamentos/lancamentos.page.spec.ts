import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LancamentosPage } from './lancamentos.page';

describe('LancamentosPage', () => {
  let component: LancamentosPage;
  let fixture: ComponentFixture<LancamentosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LancamentosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LancamentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
