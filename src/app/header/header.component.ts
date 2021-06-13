import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogNoWorkerFoundComponent } from '../dialogs/dialogNoWorkerFound/dialogNoWorkerFound.component';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    // private storageService: StorageService,
    // private router: Router,
    // public dialog: MatDialog,
    ) {}

  ngOnInit() {
    // if (!this.storageService.getWorker() && this.router.url != '/') this.noWorkerFound();
  }

  // noWorkerFound() {
  //   const dialogRef = this.dialog.open(DialogNoWorkerFoundComponent);

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log(`Dialog result: ${result}`);
  //     this.router.navigate(['/']);
  //   });
  // }
}
