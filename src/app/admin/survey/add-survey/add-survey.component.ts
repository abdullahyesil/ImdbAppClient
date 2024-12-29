import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SurveyService } from '../../../services/survey.service';
import { AlertifyServiceService } from '../../../services/alertify-service.service';
import { title } from 'process';

@Component({
  selector: 'app-add-survey',
  templateUrl: './add-survey.component.html',
  styleUrl: './add-survey.component.scss'
})
export class AddSurveyComponent implements OnInit {
  surveyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private surveyService:SurveyService,
    private alertifyService:AlertifyServiceService
  ) {
    this.surveyForm = this.fb.group({
      title: ['', Validators.required],
      createdDate: [new Date().toISOString(), Validators.required],
      options: this.fb.array([this.createOption()])
    });
  }

  ngOnInit(): void {}

  createOption(): FormGroup {
    return this.fb.group({
      id: [0],
      surveyId: [0],
      optionText: ['', Validators.required],
      voteCount: [0]
    });
  }

  get options(): FormArray {
    return this.surveyForm.get('options') as FormArray;
  }

  addOption(): void {
    this.options.push(this.createOption());
  }

  removeOption(index: number): void {
    this.options.removeAt(index);
  }

  onSubmit(): void {
    this.surveyForm.patchValue({
      createdDate: new Date().toISOString()
    });

    if (this.surveyForm.valid) {
      console.log(this.surveyForm.value);
      this.surveyService.createSurvey(this.surveyForm.value).subscribe(resp => 
        { if(resp.isSucceed)
         { this.alertifyService.succes(resp.message)
           
           this.surveyForm.get('title')?.reset('');
           this.options.controls.forEach(option => {
             option.get('optionText')?.reset('');
           });
         }
        }
       );
    }
  }
}
