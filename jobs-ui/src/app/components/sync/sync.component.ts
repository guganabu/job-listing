import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/services/jobs.service';
@Component({
  selector: 'app-sync',
  templateUrl: './sync.component.html',
  styleUrls: ['./sync.component.scss']
})
export class SyncComponent implements OnInit {

  constructor(private jobsService: JobsService) { }

  ngOnInit(): void {
  }

  importJobs() {
    this.isImporting = true;
    this.jobsService.importJobs().subscribe((payload: {totalCount: number}) => {
      console.log('payload', payload)
      this.totalImportedJobs = payload.totalCount;
      this.isImporting = false
    }, () => {
      this.isFailed = true;
    })
  }

  totalImportedJobs: number = 0;

  isImporting: boolean = false;

  isFailed: boolean = false;

}
