import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class NotFailedService implements CanActivate{
  constructor(private router: Router, private storageService: StorageService) {}

  canActivate(): boolean {
    if (this.storageService.hasFailed()) {
      this.router.navigate(['/']);
      return false;
    } else return true;
  }
}
