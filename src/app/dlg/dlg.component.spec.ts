import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgComponent } from './dlg.component';

describe('DlgComponent', () => {
  let component: DlgComponent;
  let fixture: ComponentFixture<DlgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
