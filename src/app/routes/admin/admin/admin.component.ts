import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }
  ngOnInit() {
  }

  isActive(instruction: any[]): boolean {
    // https://stackoverflow.com/questions/39271654/routerlinkactive-for-routerlink-with-parameters-dynamic

    // Set the second parameter to true if you want to require an exact match.
    return this.router.isActive(this.router.createUrlTree(instruction), false);
  }
}
