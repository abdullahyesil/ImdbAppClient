import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
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
    if (item && !this.siteSettings.meta.includes(item)) {
      this.siteSettings.meta.push(item);
      this.metaItem = '';
    }
  }

  removeMeta(item: string) {
    this.siteSettings.meta = this.siteSettings.meta.filter(m => m !== item);
  }

  saveSettings() {
    // Veritabanına kaydetme işlemini buraya ekleyebilirsiniz
    console.log('Settings saved:', this.siteSettings);
  }
}
