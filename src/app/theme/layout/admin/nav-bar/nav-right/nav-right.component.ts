// angular import
import { Component, inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

// bootstrap import
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-nav-right',
  imports: [SharedModule],
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavRightComponent {
  
  email: string = ''; 
  constructor(private jwtHelper: JwtHelperService) {
    const config = inject(NgbDropdownConfig);
    config.placement = 'bottom-right';
    this.getRole()
  }
  getRole(){
    const token = localStorage.getItem('access_token');
    const decodedToken: any = this.jwtHelper.decodeToken(token);
    this.email = decodedToken.email
    console.log("this is the user logged in" + this.email)
  }

}
