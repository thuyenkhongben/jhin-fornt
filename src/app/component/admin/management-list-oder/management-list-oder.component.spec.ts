import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementListOderComponent } from './management-list-oder.component';

describe('ManagementListOderComponent', () => {
  let component: ManagementListOderComponent;
  let fixture: ComponentFixture<ManagementListOderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementListOderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementListOderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
