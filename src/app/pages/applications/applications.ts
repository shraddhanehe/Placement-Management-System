import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface PlacementApplication {
  companyId: number;
  company: string;
  role: string;
  date: string;
  status: string;
}

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-heading">
      <div>
        <div class="eyebrow">YOUR CAREER JOURNEY</div>
        <h1>My Applications</h1>
        <p>Keep track of the placement opportunities you have applied for.</p>
      </div>

      <a routerLink="/companies" class="btn-primary">
        + Find Opportunities
      </a>
    </div>

    <section class="stats-grid">

      <div class="stat-card">
        <div class="stat-top">
          <div class="stat-icon purple">▤</div>
        </div>
        <h3>{{ applications.length }}</h3>
        <p>Total applications</p>
      </div>

      <div class="stat-card">
        <div class="stat-top">
          <div class="stat-icon green">✓</div>
        </div>
        <h3>{{ appliedCount }}</h3>
        <p>Submitted</p>
      </div>

      <div class="stat-card">
        <div class="stat-top">
          <div class="stat-icon orange">◷</div>
        </div>
        <h3>{{ interviewCount }}</h3>
        <p>Interview stage</p>
      </div>

      <div class="stat-card">
        <div class="stat-top">
          <div class="stat-icon blue">★</div>
        </div>
        <h3>{{ offerCount }}</h3>
        <p>Offers</p>
      </div>

    </section>

    <div class="section-title">
      <div>
        <h2>Application history</h2>
        <p>Your submitted applications appear here.</p>
      </div>

      <button class="btn-outline" (click)="loadApplications()">
        ↻ Refresh
      </button>
    </div>

    <div class="panel" *ngIf="applications.length > 0">

      <div style="overflow-x:auto">
        <table class="data-table">

          <thead>
            <tr>
              <th>COMPANY</th>
              <th>POSITION</th>
              <th>DATE APPLIED</th>
              <th>STATUS</th>
            </tr>
          </thead>

          <tbody>
            <tr *ngFor="let application of applications">

              <td>
                <strong>{{ application.company }}</strong>
              </td>

              <td>{{ application.role }}</td>

              <td>{{ application.date }}</td>

              <td>
                <span class="status">
                  {{ application.status }}
                </span>
              </td>

            </tr>
          </tbody>

        </table>
      </div>

    </div>

    <div class="empty-state" *ngIf="applications.length === 0">
      <div class="empty-icon">📄</div>

      <h3>Your journey starts with one application</h3>

      <p>
        You haven't applied to any companies yet.
        Explore available opportunities and submit your first application.
      </p>

      <a routerLink="/companies" class="btn-primary">
        Explore companies →
      </a>
    </div>

    <p class="muted" style="font-size:11px; margin-top:18px">
      Application statuses in this demo are saved locally in your browser.
      They are not connected to company recruitment systems.
    </p>
  `
})
export class Applications {

  applications: PlacementApplication[] = [];

  constructor() {
    this.loadApplications();
  }

  loadApplications(): void {
    try {
      this.applications = JSON.parse(
        localStorage.getItem('placementApplications') || '[]'
      ) as PlacementApplication[];
    } catch {
      this.applications = [];
    }
  }

  get appliedCount(): number {
    return this.applications.filter(
      application => application.status === 'Applied'
    ).length;
  }

  get interviewCount(): number {
    return this.applications.filter(
      application => application.status === 'Interview'
    ).length;
  }

  get offerCount(): number {
    return this.applications.filter(
      application => application.status === 'Offer'
    ).length;
  }
}