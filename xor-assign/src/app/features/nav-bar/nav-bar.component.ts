import { SharedService } from './../../shared/services/shared.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    private _route: Router,
    public _sharedService: SharedService,
    private _location: Location
  ) { }

  ngOnInit(): void {
  }

  redirectToLoginPage(): void {
    this._route.navigate(['/user/']);
  }

  redirectToSignupPage(): void {
    this._route.navigate(['/user/sign-up']);
  }

  backHistory(): void {
    this._location.back();
  }
}
