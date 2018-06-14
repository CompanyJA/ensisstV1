import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router/";
import {AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  public isLogin: boolean;
  public nombreUsuario: string;

  correctoLogin :boolean;
  



  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe( auth => {
      if (auth) {
        this.isLogin = true;
        this.nombreUsuario = auth.displayName;
      } else {
        this.isLogin = false;
      }
    });
  }



  onClickLogout() {
    this.authService.logout();
  }


}
