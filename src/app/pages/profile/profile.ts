import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface StudentProfile {
  name: string;
  email: string;
  branch: string;
  cgpa: number;
  backlogs: number;
  skills: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-heading">
      <div>
        <div class="eyebrow">STUDENT INFORMATION</div>
        <h1>My Profile</h1>
        <p>Keep your academic information updated for eligibility checks.</p>
      </div>
    </div>

    <div class="content-grid">

      <div class="form-card">

        <h2 style="margin-top:0">Personal and academic details</h2>

        <p class="muted" style="line-height:1.7; margin-bottom:25px">
          Complete the details below and save your profile.
          Your information is stored in this browser for this demo.
        </p>

        <form #profileForm="ngForm" (ngSubmit)="saveProfile()">

          <div class="form-grid">

            <div class="form-field">
              <label for="studentName">Full name *</label>

              <input
                id="studentName"
                name="name"
                [(ngModel)]="profile.name"
                required
                minlength="2"
                placeholder="Enter your full name">
            </div>

            <div class="form-field">
              <label for="studentEmail">Email address *</label>

              <input
                id="studentEmail"
                name="email"
                type="email"
                [(ngModel)]="profile.email"
                required
                email
                placeholder="student@example.com">
            </div>

            <div class="form-field">
              <label for="studentBranch">Department / Branch *</label>

              <select
                id="studentBranch"
                name="branch"
                [(ngModel)]="profile.branch"
                required>

                <option value="Information Technology">
                  Information Technology
                </option>

                <option value="Computer Engineering">
                  Computer Engineering
                </option>

                <option value="Artificial Intelligence and Machine Learning">
                  Artificial Intelligence and Machine Learning
                </option>

                <option value="Electronics">
                  Electronics
                </option>

                <option value="Mechanical Engineering">
                  Mechanical Engineering
                </option>

                <option value="Civil Engineering">
                  Civil Engineering
                </option>

                <option value="Other">Other</option>

              </select>
            </div>

            <div class="form-field">
              <label for="studentCgpa">Current CGPA *</label>

              <input
                id="studentCgpa"
                name="cgpa"
                type="number"
                [(ngModel)]="profile.cgpa"
                required
                min="0"
                max="10"
                step="0.01"
                placeholder="Example: 8.20">
            </div>

            <div class="form-field">
              <label for="studentBacklogs">Current backlogs *</label>

              <input
                id="studentBacklogs"
                name="backlogs"
                type="number"
                [(ngModel)]="profile.backlogs"
                required
                min="0"
                step="1"
                placeholder="Example: 0">
            </div>

            <div class="form-field">
              <label for="studentSkills">Technical skills</label>

              <input
                id="studentSkills"
                name="skills"
                [(ngModel)]="profile.skills"
                placeholder="C++, Java, HTML, SQL">
            </div>

          </div>

          <div *ngIf="message"
            class="notice"
            [class.error]="messageType === 'error'">
            {{ message }}
          </div>

          <button class="btn-primary"
            type="submit"
            [disabled]="!profileForm.valid">
            Save Profile →
          </button>

        </form>

      </div>

      <aside>

        <section class="panel">
          <div class="stat-icon purple">♙</div>

          <h3 style="margin-top:15px">Profile preview</h3>

          <h2>{{ profile.name || 'Your Name' }}</h2>

          <p class="muted">{{ profile.email || 'Your email address' }}</p>

          <div class="job-tags">
            <span class="tag">{{ profile.branch || 'Your branch' }}</span>
          </div>

          <div class="check-row">
            <span class="check-dot">✓</span>
            CGPA: {{ profile.cgpa || 0 }}
          </div>

          <div class="check-row">
            <span class="check-dot">✓</span>
            Backlogs: {{ profile.backlogs }}
          </div>

          <div class="check-row">
            <span class="check-dot">✓</span>
            Skills: {{ profile.skills || 'Not added' }}
          </div>
        </section>

        <section class="panel">
          <h3>Why complete your profile?</h3>

          <div class="check-row">
            <span class="check-dot">✓</span>
            Check sample company eligibility
          </div>

          <div class="check-row">
            <span class="check-dot">✓</span>
            Keep academic information organized
          </div>

          <div class="check-row">
            <span class="check-dot">✓</span>
            Track your placement preparation
          </div>
        </section>

      </aside>

    </div>
  `
})
export class Profile {

  profile: StudentProfile = {
    name: '',
    email: '',
    branch: 'Information Technology',
    cgpa: 0,
    backlogs: 0,
    skills: ''
  };

  message = '';
  messageType: 'success' | 'error' = 'success';

  constructor() {
    this.loadProfile();
  }

  private loadProfile(): void {
    try {
      const saved = localStorage.getItem('placementProfile');

      if (saved) {
        const parsed = JSON.parse(saved) as Partial<StudentProfile>;

        this.profile = {
          ...this.profile,
          ...parsed
        };
      }
    } catch {
      this.message = 'Could not load the saved profile.';
      this.messageType = 'error';
    }
  }

  saveProfile(): void {
    const name = this.profile.name.trim();
    const email = this.profile.email.trim();
    const cgpa = Number(this.profile.cgpa);
    const backlogs = Number(this.profile.backlogs);

    if (!name || !email) {
      this.message = 'Please enter your name and email.';
      this.messageType = 'error';
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.message = 'Please enter a valid email address.';
      this.messageType = 'error';
      return;
    }

    if (!Number.isFinite(cgpa) || cgpa < 0 || cgpa > 10) {
      this.message = 'CGPA must be between 0 and 10.';
      this.messageType = 'error';
      return;
    }

    if (!Number.isInteger(backlogs) || backlogs < 0) {
      this.message = 'Backlogs must be a whole number of zero or more.';
      this.messageType = 'error';
      return;
    }

    this.profile = {
      ...this.profile,
      name,
      email,
      cgpa,
      backlogs,
      skills: this.profile.skills.trim()
    };

    try {
      localStorage.setItem(
        'placementProfile',
        JSON.stringify(this.profile)
      );

      this.message = 'Profile saved successfully!';
      this.messageType = 'success';
    } catch {
      this.message = 'Unable to save your profile in this browser.';
      this.messageType = 'error';
    }
  }
}