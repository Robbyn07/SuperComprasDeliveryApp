import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.page.html',
  styleUrls: ['./ayuda.page.scss'],
})
export class AyudaPage implements OnInit {

  url:string;
  constructor(private route: ActivatedRoute, private router:Router) { 
    route.queryParams.subscribe(params =>{
      this.url = params.url;
      if(this.router.getCurrentNavigation().extras.queryParams){
        this.url = this.router.getCurrentNavigation().extras.queryParams.url;
      };
    })
  }

  ngOnInit() {
  }

  regresar(){
    this.router.navigate([this.url])
  }

}
