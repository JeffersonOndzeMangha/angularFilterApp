import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterviewComponent } from './filterview.component';

describe('FilterviewComponent', () => {
  let component: FilterviewComponent;
  let fixture: ComponentFixture<FilterviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
