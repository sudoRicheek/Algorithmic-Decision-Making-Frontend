import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotAllowedHereComponent } from '../dialogs/notAllowedHere/notAllowedHere.component';
import { StorageService } from '../services/storage.service';
import { WorkerService } from '../services/worker.service';

@Component({
  selector: 'app-uniqueCode',
  templateUrl: './uniqueCode.component.html',
  styleUrls: ['./uniqueCode.component.css']
})
export class UniqueCodeComponent implements OnInit {
  uniqueCode: string;


  constructor(
    public workerService: WorkerService,
    public storageService:  StorageService,
    private dialog: MatDialog,
    public router: Router,
  ) { 
    this.uniqueCode = '';
  }

  ngOnInit() {
    let localWorker = this.storageService.getWorker();
    if(localWorker)
      this.workerService.getUniqueCode(localWorker).subscribe(
        (response) => {
          this.uniqueCode = response.unique_code;
        },
        (errors) => {
          this.notAllowedHere();
        }
      );
  }

  notAllowedHere() {
    const dialogRef = this.dialog.open(NotAllowedHereComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.router.navigate(['/']);
    });
  }

}
