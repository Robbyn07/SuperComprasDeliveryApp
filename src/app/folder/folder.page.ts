import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { NegociosService } from '../services/negocios.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {

  negocios: any;
  public folder: string;

  constructor(private activatedRoute: ActivatedRoute,private router:Router, private negociosService:NegociosService) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.negocios = this.negociosService.getNegocios();
  }

  abrir(negocio:any){
    let params: NavigationExtras = {
      queryParams:{
        negocio:negocio,
      }
    }
    this.router.navigate(["/negocio"],params)
  }

}
