import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AutoCompleteCountriesComponent } from '@app/shared/components/autocomplete-countries/autocomplete-countries.component';
import { MaterialModule } from '@app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AutoCompleteCountriesComponent', () => {
  let component: AutoCompleteCountriesComponent;
  let fixture: ComponentFixture<AutoCompleteCountriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AutoCompleteCountriesComponent],
      imports: [MaterialModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, HttpClientTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoCompleteCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
