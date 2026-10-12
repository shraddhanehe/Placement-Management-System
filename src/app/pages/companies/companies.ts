import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Company {
  id: number;
  name: string;
  initial: string;
  role: string;
  package: string;
  cgpa: number;
  backlogs: number;
  location: string;
  category: string;
  logoClass: string;
}

interface StudentProfile {
  name?: string;
  cgpa?: number;
  backlogs?: number;
}

interface PlacementApplication {
  companyId: number;
  company: string;
  role: string;
  date: string;
  status: string;
}

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-heading">
      <div>
        <div class="eyebrow">CAREER OPPORTUNITIES</div>
        <h1>Find your next opportunity</h1>
        <p>Explore companies and check whether you meet their sample criteria.</p>
      </div>
    </div>

    <section class="hero">
      <div class="hero-copy">
        <span class="hero-tag">YOUR CAREER STARTS HERE</span>
        <h2>Discover a role<br>that fits your ambition.</h2>
        <p>
          Search opportunities, review eligibility, and track your
          applications in one place.
        </p>
      </div>
      <div class="hero-art">💼</div>
    </section>

    <div class="search-bar">
      <input
        type="search"
        name="search"
        [(ngModel)]="searchText"
        placeholder="Search by company, role, or technology..."
        aria-label="Search companies">

      <select
        class="filter-select"
        name="category"
        [(ngModel)]="selectedCategory"
        aria-label="Filter by category">
        <option value="All">All categories</option>
        <option value="IT">IT</option>
        <option value="Software">Software</option>
        <option value="Technology">Technology</option>
      </select>
    </div>

    <div class="section-title">
      <div>
        <h2>Available companies</h2>
        <p>{{ filteredCompanies.length }} opportunities in this demo</p>
      </div>
      <a href="javascript:void(0)" class="text-link"
        (click)="clearFilters()">Clear filters</a>
    </div>

    <div class="grid" *ngIf="filteredCompanies.length > 0">

      <article class="job-card" *ngFor="let company of filteredCompanies">

        <div class="job-header">
          <div class="company-logo" [ngClass]="company.logoClass">
            {{ company.initial }}
          </div>

          <div class="job-info">
            <h3>{{ company.name }}</h3>
            <p>{{ company.location }}</p>
          </div>
        </div>

        <h3 style="margin-top:22px">{{ company.role }}</h3>

        <div class="job-tags">
          <span class="tag">{{ company.category }}</span>
          <span class="tag">Full-time</span>
          <span class="tag">Freshers</span>
        </div>

        <div class="job-bottom">
          <div>
            <strong>{{ company.package }}</strong>
            <small style="display:block; margin-top:5px">
              Sample package
            </small>
          </div>

          <span class="tag">
            CGPA {{ company.cgpa }}+
          </span>
        </div>

        <div class="check-row">
          <span class="check-dot">
            {{ isEligible(company) ? '✓' : '!' }}
          </span>

          <span>
            {{ isEligible(company)
              ? 'Meets sample eligibility'
              : eligibilityMessage(company) }}
          </span>
        </div>

        <button
          class="btn-primary"
          style="width:100%; margin-top:10px"
          [disabled]="!isEligible(company) || hasApplied(company.id)"
          (click)="apply(company)">

          {{ hasApplied(company.id) ? 'Already Applied' :
             isEligible(company) ? 'Apply Now →' : 'Not Eligible' }}

        </button>

      </article>

    </div>

    <div class="empty-state" *ngIf="filteredCompanies.length === 0">
      <div class="empty-icon">🔎</div>
      <h3>No companies found</h3>
      <p>Try a different company name or category.</p>
      <button class="btn-primary" (click)="clearFilters()">
        Clear filters
      </button>
    </div>

    <div *ngIf="message"
      class="notice"
      [class.error]="messageType === 'error'">
      {{ message }}
    </div>

    <p class="muted" style="font-size:11px; margin-top:22px">
      Educational demo: company information and eligibility rules are
      illustrative and do not represent current recruitment openings.
    </p>
  `
})
export class Companies {

  searchText = '';
  selectedCategory = 'All';
  message = '';
  messageType: 'success' | 'error' = 'success';

  companies: Company[] = [
    {
      id: 1,
      name: 'TCS',
      initial: 'T',
      role: 'Software Engineer',
      package: '₹3.5–7 LPA',
      cgpa: 6,
      backlogs: 0,
      location: 'India',
      category: 'IT',
      logoClass: ''
    },
    {
      id: 2,
      name: 'Infosys',
      initial: 'I',
      role: 'Systems Engineer',
      package: '₹3.5–6.5 LPA',
      cgpa: 6,
      backlogs: 0,
      location: 'India',
      category: 'Software',
      logoClass: 'blue-logo'
    },
    {
      id: 3,
      name: 'Wipro',
      initial: 'W',
      role: 'Project Engineer',
      package: '₹3.5–6 LPA',
      cgpa: 6,
      backlogs: 0,
      location: 'India',
      category: 'IT',
      logoClass: 'green-logo'
    },
    {
      id: 4,
      name: 'Accenture',
      initial: 'A',
      role: 'Associate Developer',
      package: '₹4–7 LPA',
      cgpa: 6,
      backlogs: 0,
      location: 'India',
      category: 'Technology',
      logoClass: 'orange-logo'
    }
  ];

  get filteredCompanies(): Company[] {
    const search = this.searchText.trim().toLowerCase();

    return this.companies.filter(company => {
      const matchesSearch =
        company.name.toLowerCase().includes(search) ||
        company.role.toLowerCase().includes(search) ||
        company.category.toLowerCase().includes(search) ||
        company.location.toLowerCase().includes(search);

      const matchesCategory =
        this.selectedCategory === 'All' ||
        company.category === this.selectedCategory;

      return matchesSearch && matchesCategory;
    });
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

  isEligible(company: Company): boolean {
    const profile = this.getProfile();

    const cgpa = Number(profile.cgpa);
    const backlogs = Number(profile.backlogs ?? 0);

    return !!profile.name?.trim() &&
      cgpa >= company.cgpa &&
      backlogs <= company.backlogs;
  }

  eligibilityMessage(company: Company): string {
    const profile = this.getProfile();

    if (!profile.name?.trim()) {
      return 'Complete your profile first';
    }

    if (Number(profile.cgpa) < company.cgpa) {
      return `Minimum CGPA: ${company.cgpa}`;
    }

    if (Number(profile.backlogs ?? 0) > company.backlogs) {
      return 'Backlog criteria not met';
    }

    return 'Check profile details';
  }

  hasApplied(companyId: number): boolean {
    return this.getApplications().some(
      application => application.companyId === companyId
    );
  }

  apply(company: Company): void {
    if (!this.isEligible(company)) {
      this.message = 'Please complete your profile and check eligibility.';
      this.messageType = 'error';
      return;
    }

    if (this.hasApplied(company.id)) {
      this.message = `You have already applied to ${company.name}.`;
      this.messageType = 'error';
      return;
    }

    const applications = this.getApplications();

    applications.push({
      companyId: company.id,
      company: company.name,
      role: company.role,
      date: new Date().toLocaleDateString(),
      status: 'Applied'
    });

    try {
      localStorage.setItem(
        'placementApplications',
        JSON.stringify(applications)
      );

      this.message = `Application submitted to ${company.name}!`;
      this.messageType = 'success';
    } catch {
      this.message = 'Unable to save the application in this browser.';
      this.messageType = 'error';
    }
  }

  clearFilters(): void {
    this.searchText = '';
    this.selectedCategory = 'All';
    this.message = '';
  }
}