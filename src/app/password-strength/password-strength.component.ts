import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-strength',
  standalone: true,
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss'],
  imports: [FormsModule, CommonModule],
})
export class PasswordStrengthComponent implements OnInit {
  password: string = '';
  strength: string = 'empty';
  strengthColors: string[] = ['gray', 'gray', 'gray'];
  feedback: string[] = [];

  ngOnInit() {}

  checkStrength(): void {
    this.feedback = [];

    const hasUpperCase = /[A-Z]/.test(this.password);
    const hasLowerCase = /[a-z]/.test(this.password);
    const hasNumbers = /[0-9]/.test(this.password);
    const hasSymbols = /[^a-zA-Z0-9]/.test(this.password);

    if (this.password.length === 0) {
      this.strength = 'empty';
      this.strengthColors = ['gray', 'gray', 'gray'];
      return;
    }

    if (this.password.length < 8) {
      this.strength = 'weak';
      this.strengthColors = ['red', 'red', 'red'];
      this.feedback.push('Needs at least 8 characters.');
      return
    }

    const complexity = this.calculateComplexity(
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSymbols
    );

    this.setStrength(complexity);
    this.setFeedback(
      complexity,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSymbols
    );
  }

  calculateComplexity(
    hasUpperCase: boolean,
    hasLowerCase: boolean,
    hasNumbers: boolean,
    hasSymbols: boolean
  ): number {
    let complexity = 0;

    if (hasUpperCase || hasLowerCase || hasNumbers || hasSymbols) {
      complexity = 1;
    }
    if (
      hasUpperCase ||
      (hasLowerCase && hasSymbols) ||
      hasUpperCase ||
      (hasLowerCase && hasNumbers) ||
      (hasNumbers && hasSymbols)
    ) {
      complexity = 2;
    }
    if (hasUpperCase && hasLowerCase && hasNumbers && hasSymbols) {
      complexity = 3;
    }

    return complexity;
  }

  setStrength(complexity: number): void {
    switch (complexity) {
      case 1:
        this.strength = 'easy';
        this.strengthColors = ['red', 'gray', 'gray'];
        break;
      case 2:
        this.strength = 'medium';
        this.strengthColors = ['yellow', 'yellow', 'gray'];
        break;
      case 3:
        this.strength = 'strong';
        this.strengthColors = ['green', 'green', 'green'];
        break;
      default:
        this.strength = 'empty';
        this.strengthColors = ['gray', 'gray', 'gray'];
    }
  }

  setFeedback(
    complexity: number,
    hasUpperCase: boolean,
    hasLowerCase: boolean,
    hasNumbers: boolean,
    hasSymbols: boolean
  ): void {
    if (!hasUpperCase) {
      this.feedback.push('Needs at least one uppercase letter.');
    }
    if (!hasLowerCase) {
      this.feedback.push('Needs at least one lowercase letter.');
    }
    if (!hasNumbers) {
      this.feedback.push('Needs at least one number.');
    }
    if (!hasSymbols) {
      this.feedback.push('Needs at least one special character.');
    }
  }
}
