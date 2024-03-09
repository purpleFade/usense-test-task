import { Component } from '@angular/core';
import { PasswordStrengthComponent } from './password-strength/password-strength.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [PasswordStrengthComponent]
})
export class AppComponent {
  title = 'usense-test-task';
}
