import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinGraphComponent } from './fin-graph.component';

describe('FinGraphComponent', () => {
  let component: FinGraphComponent;
  let fixture: ComponentFixture<FinGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
