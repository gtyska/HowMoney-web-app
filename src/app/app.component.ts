import { Component } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'howmoney';
  isLoggedIn = false;

  constructor(private tokenStorageService: TokenStorageService) { }
  ngOnInit(): void {
    var token = this.tokenStorageService.getToken();
    if(token != null) {
      this.isLoggedIn = true;
    }
    else {
      this.isLoggedIn = false;
    }
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
    }
  }
}
