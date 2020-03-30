import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'clientApp';
  searchTerm = '';

  get Token() {
    return localStorage.getItem('token');
  }

  logout() {}

  search() {
    
  }
}
