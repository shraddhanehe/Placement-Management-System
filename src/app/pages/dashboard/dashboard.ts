import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface StudentProfile {
  name?: string;
  email?: string;
  branch?: string;
  cgpa?: number;
  backlogs?: number;
  skills?: string;
}

interface PlacementApplication {
  companyId: number;
  company: string;
  role: string;
  date: string;
  status: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-heading">
      <div>
        <div class="eyebrow">STUDENT WORKSPACE</div>
        <h1>Good morning, {{ studentName }} 👋</h1>
        <p>
          Here's what's happening with your placement journey today.
        </p>
      </div>

      <a routerLink="/profile" class="btn-outline">
        ✎ Edit Profile
      </a>
    </div>

    <section class="hero">
      <div class="hero-copy">
        <span class="hero-tag">
          ✦ YOUR NEXT CHAPTER STARTS HERE
        </span>

        <h2>
          Big dreams.<br>
          Great opportunities.
        </h2>

        <p>
          Discover exciting career opportunities, find companies
          that match your skills, and take the next step toward
          your dream career.
        </p>

        <a routerLink="/companies" class="btn-primary">
          Explore opportunities →
        </a>
      </div>

      <div class="hero-art">🚀</div>
    </section>

    <section class="stats-grid">

      <div class="stat-card">
        <div class="stat-top">
          <div class="stat-icon purple">▦</div>
          <span class="stat-change">Explore</span>
        </div>
        <h3>{{ companiesCount }}</h3>
        <p>Available companies</p>
      </div>

      <div class="stat-card">
        <div class="stat-top">
          <div class="stat-icon green">✓</div>
          <span class="stat-change">My activity</span>
        </div>
        <h3>{{ applicationCount }}</h3>
        <p>Applications submitted</p>
      </div>

      <div class="stat-card">
        <div class="stat-top">
          <div class="stat-icon orange">☆</div>
          <span class="stat-change">Your progress</span>
        </div>
        <h3>{{ profileComplete ? 'Ready' : 'Pending' }}</h3>
        <p>Profile completion status</p>
      </div>

      <div class="stat-card">
        <div class="stat-top">
          <div class="stat-icon blue">↗</div>
          <span class="stat-change">Keep going</span>
        </div>
        <h3>{{ readiness }}%</h3>
        <p>Profile readiness estimate</p>
      </div>

    </section>

    <section class="content-grid">

      <div>
        <div class="section-title">
          <div>
            <h2>Featured companies</h2>
            <p>Explore sample opportunities for fresh graduates.</p>
          </div>

          <a routerLink="/companies" class="text-link">
            View all →
          </a>
        </div>

        <div class="job-list">

          <article class="job-card" *ngFor="let job of featuredJobs">

            <div class="job-header">

              <div class="company-logo" [ngClass]="job.logoClass">
                {{ job.initial }}
              </div>

              <div class="job-info">
                <h3>{{ job.role }}</h3>
                <p>{{ job.company }} · {{ job.location }}</p>
              </div>

              <div class="job-package">
                {{ job.package }}
              </div>

            </div>

            <div class="job-tags">
              <span class="tag">Full-time</span>
              <span class="tag">Freshers</span>
              <span class="tag">{{ job.category }}</span>
            </div>

            <div class="job-bottom">
              <small>Sample opportunity · Check criteria</small>

              <a routerLink="/companies" class="btn-outline">
                View details →
              </a>
            </div>

          </article>

        </div>
      </div>

      <aside>

        <section class="panel">
          <h3>Placement readiness</h3>

          <div class="readiness-score">

            <div class="progress-ring"
              [style.background]="readinessGradient">
              <strong>{{ readiness }}%</strong>
            </div>

            <div>
              <h4>
                {{ profileComplete ? 'Great progress!' : 'Build your profile' }}
              </h4>

              <p>
                {{ profileComplete
                  ? 'Your basic details are saved. Keep your skills updated.'
                  : 'Add your academic details to improve your profile.' }}
              </p>
            </div>

          </div>

          <div class="check-row">
            <span class="check-dot">{{ hasName ? '✓' : '○' }}</span>
            Personal details
          </div>

          <div class="check-row">
            <span class="check-dot">
              {{ hasAcademicDetails ? '✓' : '○' }}
            </span>
            Academic details
          </div>

          <div class="check-row">
            <span class="check-dot">{{ hasSkills ? '✓' : '○' }}</span>
            Skills
          </div>

          <a routerLink="/profile"
            class="btn-primary"
            style="width:100%; margin-top:12px">
            Complete my profile →
          </a>
        </section>

        <section class="panel">
          <h3>Quick actions</h3>

          <a routerLink="/companies" class="check-row">
            <span class="stat-icon purple">⌕</span>
            Find placement companies →
          </a>

          <a routerLink="/applications" class="check-row">
            <span class="stat-icon green">▤</span>
            Track my applications →
          </a>

          <a routerLink="/profile" class="check-row">
            <span class="stat-icon orange">♙</span>
            Update student profile →
          </a>
        </section>

        <section class="panel">
          <h3>Placement tip ✨</h3>

          <p style="color:#85869b; line-height:1.8; font-size:12px">
            Practise DSA, prepare your resume, improve communication
            skills, and check each company's eligibility criteria
            before applying.
          </p>
        </section>

      </aside>

    </section>
  `
})
export class Dashboard {

  studentName = 'Student';

  featuredJobs = [
    {
      company: 'TCS',
      initial: 'T',
      role: 'Software Engineer',
      location: 'India',
      package: 'Sample role',
      category: 'IT',
      logoClass: ''
    },
    {
      company: 'Infosys',
      initial: 'I',
      role: 'Systems Engineer',
      location: 'India',
      package: 'Sample role',
      category: 'Software',
      logoClass: 'blue-logo'
    },
    {
      company: 'Accenture',
      initial: 'A',
      role: 'Associate Developer',
      location: 'India',
      package: 'Sample role',
      category: 'Technology',
      logoClass: 'orange-logo'
    }
  ];

  constructor() {
    this.loadStudentName();
  }

  private getProfile(): StudentProfile {
    try {
      return JSON.parse(
        localStorage.getItem('placementProfile') || '{}'
      ) as StudentProfile;
    } catch {
      return {};
    }
  }

  private getApplications(): PlacementApplication[] {
    try {
      return JSON.parse(
        localStorage.getItem('placementApplications') || '[]'
      ) as PlacementApplication[];
    } catch {
      return [];
    }
  }

  private loadStudentName(): void {
    const profile = this.getProfile();

    if (profile.name?.trim()) {
      this.studentName = profile.name.trim().split(' ')[0];
    }
  }

  get applicationCount(): number {
    return this.getApplications().length;
  }

  get companiesCount(): number {
    return 4;
  }

  get hasName(): boolean {
    return !!this.getProfile().name?.trim();
  }

  get hasAcademicDetails(): boolean {
    return Number(this.getProfile().cgpa) > 0;
  }

  get hasSkills(): boolean {
    return !!this.getProfile().skills?.trim();
  }

  get profileComplete(): boolean {
    const profile = this.getProfile();

    return !!profile.name?.trim() &&
      !!profile.email?.trim() &&
      Number(profile.cgpa) > 0;
  }

  get readiness(): number {
    let score = 0;

    if (this.hasName) {
      score += 30;
    }

    if (this.getProfile().email?.trim()) {
      score += 20;
    }

    if (this.hasAcademicDetails) {
      score += 30;
    }

    if (this.hasSkills) {
      score += 20;
    }

    return score;
  }

  get readinessGradient(): string {
    const degrees = this.readiness * 3.6;

    return `conic-gradient(#725be9 0deg ${degrees}deg, #eeecf8 ${degrees}deg 360deg)`;
  }
}