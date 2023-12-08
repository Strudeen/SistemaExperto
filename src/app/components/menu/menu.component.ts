import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  showFiller = false;
  opened=true;

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthenticationService) { }

  navigateTo(route:string){
    this.router.navigate([route], {relativeTo:this.route});
  }
  logOut(){
    this.authService.logout();
  }
}
