import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  searchTerm = '';

 public rating: number = 3;
 public color: string = 'accent';
 public starCount: number = 5;

 ratingArr = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }

  // detail(id) {
  //   this.router.navigate(['/layouts/detail', id]);
  // }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  search() {
    if(this.searchTerm){
      this.router.navigate(['search', {query: this.searchTerm}]);
    }
  }

}
