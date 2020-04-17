import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private jobsService : JobsService) { }

  ngOnInit(): void {
  }

  onSearchJob() {
    console.log('title', this.title);
    console.log('location', this.location);
    this.isSearchStarted = true;
    const queryParams = {
      title: this.title || '',
      location: this.location || ''
    }
    this.jobsService.fetchJobs(queryParams).subscribe((jobs: any[]) => {
      console.log('jobs', jobs);
      this.jobList = jobs;
    });
  }

  location: string;

  title: string;

  jobList: any[] = [];

  isSearchStarted: boolean = false;

}
