import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CommitmentCheckboxModalPage } from './commitment-checkbox-modal.page';

describe('CommitmentCheckboxModalPage', () => {
  let component: CommitmentCheckboxModalPage;
  let fixture: ComponentFixture<CommitmentCheckboxModalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitmentCheckboxModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CommitmentCheckboxModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
