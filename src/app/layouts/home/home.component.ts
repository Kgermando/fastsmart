import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  searchTerm = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  get token(){
    return localStorage.getItem('token');
  }

  search() {
    if(this.searchTerm){
      this.router.navigate(['search', {query: this.searchTerm}]);
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/layouts']);
  }

}
