import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueriesSectionComponent } from './queriesSection.component';

describe('QueriesSectionComponent', () => {
  let component: QueriesSectionComponent;
  let fixture: ComponentFixture<QueriesSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueriesSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueriesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
