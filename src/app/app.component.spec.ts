import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TitleComponent } from './components/title/title.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: TitleComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TitleComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render title component', () => {
    const title = fixture.debugElement.query(By.css('app-title'));
    expect(title).toBeTruthy()
  });

});
