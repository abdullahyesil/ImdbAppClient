import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { SiteSettings } from '../model/site-settings';

@Component({
  selector: 'app-meta-key',
  templateUrl: './meta-key.component.html',
  styleUrl: './meta-key.component.scss'
})
export class MetaKeyComponent implements OnInit{
  constructor(private adminService:AdminService) {
    
  }
  siteSetting:SiteSettings
  
  ngOnInit(): void {
    this.adminService.getSiteSettings().subscribe(resp => {
      this.siteSetting = resp;

      if (!this.siteSetting.meta) {
        this.siteSetting.meta = []; // meta özelliği undefined ise, boş bir dizi olarak başlatın
      }
    });
  }

  siteMetaGenerate(){
    if (this.siteSetting && this.siteSetting.meta && this.siteSetting.meta.length > 0) {
      return this.siteSetting.meta.join(', ');
    } else {
      return "Girilmedi";
    }
  }
}
