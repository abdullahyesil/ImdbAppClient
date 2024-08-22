import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-add-story',
  templateUrl: './add-story.component.html',
  styleUrl: './add-story.component.scss'
})
export class AddStoryComponent implements OnInit {
  storyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private AdminService:AdminService
  ) {}

  ngOnInit(): void {
    this.storyForm = this.fb.group({
      name: ['', Validators.required],
      imgUrl: ['', Validators.required],
    });
  }

  addStory(){
    if(this.storyForm.valid){
      this.AdminService.addStory(this.storyForm.value).subscribe(resp=> console.log(resp))
    }

  }
}
