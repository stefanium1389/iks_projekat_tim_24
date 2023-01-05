import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockDialogComponent } from './block-dialog.component';

describe('BlockDialogComponent', () => {
  let component: BlockDialogComponent;
  let fixture: ComponentFixture<BlockDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
