import {Component, OnInit} from '@angular/core';
import {Candidate} from "../../interfaces/candidate";
import {ActivatedRoute} from "@angular/router";
import {HomeService} from "../../services/home.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  candidate: Candidate | null = null;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private homeService: HomeService
  ) {
    console.log('HomeComponent constructor called');

  }

  ngOnInit() {
    console.log('ngOnInit called');
    this.route.params.subscribe(params => {
      const candidateId = params['candidateId'];
      console.log('Candidate ID from route:', candidateId);
      this.loadCandidateDetails(candidateId);
    });
  }

  async loadCandidateDetails(id: string) {
    try {
      console.log('Fetching candidate details for ID:', id);
      this.candidate = await this.homeService.getCandidateDetails(id);
      console.log('Candidate details loaded:', this.candidate);
    } catch (error) {
      console.error('Error fetching candidate details:', error);
      this.error = 'Failed to load candidate details. Please try again later.';
    }
  }
}
