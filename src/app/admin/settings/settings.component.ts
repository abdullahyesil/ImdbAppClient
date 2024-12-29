import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { SiteSettings } from '../../model/site-settings';
import { AlertifyServiceService } from '../../services/alertify-service.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {

constructor(
  private AdminService:AdminService,
  private aletifyService:AlertifyServiceService
) {
  
}  
  ngOnInit(): void {
   this.AdminService.getSiteSettings().subscribe(resp=> this.siteSettings = resp)


  }
  siteSettings = {
    id: 1,
    name: '',
    description: '',
    meta: [] as string[],
    author: '', 
    facebook: '',
    twitter: '',
    tiktok: '',
    youtube: '',
    instagram: ''
  };

  metaItem = '';

  addMeta(item: string) {
    // siteSettings ve meta dizisinin tanımlı olup olmadığını kontrol et
    if (item && this.siteSettings && this.siteSettings.meta && !this.siteSettings.meta.includes(item)) {
      this.siteSettings.meta.push(item);
      this.metaItem = ''; // İşlem başarılıysa, input alanını temizle
    }
  }
  

  removeMeta(item: string) {
    this.siteSettings.meta = this.siteSettings.meta.filter(m => m !== item);
  }

  saveSettings() {
 
    this.AdminService.updateSiteSettings(this.siteSettings).subscribe(resp=> 
{
  if(resp.isSucceed == true)
  { 
    this.aletifyService.succes(resp.message)
  }
  else {
    this.aletifyService.warning(resp.message)
  }
}
    )

  }
}
