import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideogamesSectionComponent } from './videogamesSection.component';

describe('VideogamesSectionComponent', () => {
  let component: VideogamesSectionComponent;
  let fixture: ComponentFixture<VideogamesSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideogamesSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideogamesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
