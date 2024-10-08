import { Component, OnInit } from '@angular/core';
import { ActorService } from '../../services/actor.service';
import { ActorDTO } from '../../model/entities/DTO/actorDTO';
import { AlertifyServiceService } from '../../services/alertify-service.service';
import { PageEvent } from '@angular/material/paginator';
import { FileUploadEvent, UploadEvent } from 'primeng/fileupload';

@Component({
  selector: 'app-add-actor',
  templateUrl: './add-actor.component.html',
  styleUrls: ['./add-actor.component.scss']
})
export class AddActorComponent implements OnInit {



  actor: ActorDTO = {
    id: null,
    name: '',
    imageUrl: null,
    File: null
  };

  actors: ActorDTO[] = [];
  pageIndex: number = 0;
  size: number = 10;
  totalCount: number;
  searchKey: string = '';
  isEditing: boolean = false;

  constructor(
    private actorService: ActorService,
    private alertifyService: AlertifyServiceService
  ) { }

  ngOnInit(): void {
    this.loadActor(this.pageIndex, this.size, this.searchKey);
  }

  loadActor(page: number, size: number, searchKey?: string): void {
    this.actorService.get(page, size, searchKey).subscribe(resp => {
      this.actors = resp.actors;
      this.totalCount = resp.totalCount;
    });
  }

  search(event: string): void {
    this.loadActor(this.pageIndex, this.size, event);
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.size = event.pageSize;
    this.loadActor(this.pageIndex, this.size, this.searchKey);
  }

  addActor(): void {
    if (this.isEditing) {
      this.updateActor();  // Eğer düzenleme modundaysak güncelleme işlemi yap
    } else {
      this.createActor();  // Aksi takdirde yeni bir aktör oluştur
    }
  }

  createActor(): void {
    this.actor.File = this.selectedFile
    this.actorService.add(this.actor).subscribe({
      next: (resp) => {
        this.alertifyService.succes("Oyuncu başarıyla eklendi.");
        this.loadActor(this.pageIndex, this.size, this.searchKey);  // Listeyi güncelle
        this.resetForm();
      },
      error: (err) => {
        this.alertifyService.error("Oyuncu eklenirken bir hata oluştu.");
      }
    });
  }

  editActor(actor: ActorDTO): void {
    this.actor = { ...actor };  // Aktörün mevcut verilerini formda göster
    this.isEditing = true;  // Düzenleme moduna geç
  }

  updateActor(): void {
    if (this.actor.id) {
      this.actor.File = this.selectedFile
      this.actorService.update(this.actor).subscribe({
        next: (resp) => {
          this.alertifyService.succes("Oyuncu başarıyla güncellendi.");
          this.loadActor(this.pageIndex, this.size, this.searchKey);  // Listeyi güncelle
          this.resetForm();
        },
        error: (err) => {
          this.alertifyService.error("Oyuncu güncellenirken bir hata oluştu.");
        }
      });
    } else {
      this.alertifyService.error("Güncelleme için geçerli bir Id gereklidir.");
    }
  }

  resetForm(): void {
    this.actor = { id: null, name: '' , File:null, imageUrl:null};
    this.isEditing = false;
  }

  delete(id: number) {
    this.actorService.delete(id).subscribe({
       next: (resp) => {

        if(!!resp.isSucceed){
          this.alertifyService.succes("Oyuncu başarıyla silindi.");
          this.loadActor(this.pageIndex, this.size, this.searchKey);  // Listeyi güncelle
        }
    },
    error: (err) => {
      this.alertifyService.error("Oyuncu silinirken bir hata oluştu.");
    }
  });
    }
    
    selectedFile: File | null = null;
showFileUpload: boolean = true;
    onUpload(event: any): void {
      const files: File[] = event.files;
  
      if (files && files.length > 0) {
          const file: File = files[0];
  
          const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
  
          if (allowedTypes.includes(file.type)) {
              this.selectedFile = file;
              this.actor.File = this.selectedFile;
              console.log('Dosya seçildi ve atandı:', this.actor.File); // Dosyanın atanıp atanmadığını kontrol edin
          } else {
              console.error('Hatalı dosya türü:', file.type);
              alert('Yalnızca PNG, JPEG, JPG, GIF türlerinde dosyalar yüklenebilir.');
          }
      }

        // Dosya seçimini tamamladıktan sonra bileşeni yeniden oluşturmak için:
    this.showFileUpload = false;
    setTimeout(() => {
        this.showFileUpload = true;
    }, 0);
  }
  

  

    }
