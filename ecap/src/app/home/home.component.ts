import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioChange, MatRadioModule} from '@angular/material/radio';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports:  [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDividerModule,
    MatSelectModule,
    MatCardModule,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {

  checkedList: any[] = [];
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  isClockEnabled!: boolean;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initFirstFormGroup();
    this.initSecondFormGroup();
    this.initThirdFormGroup();
  }

  private initFirstFormGroup(): void {
    this.firstFormGroup = this._formBuilder.group({
      name: [''],
      age: [''],
      labNo: [''],
      address: ['']
    });
  }

  private initSecondFormGroup(): void {
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['']
    });
  }

  private initThirdFormGroup(): void {
    const checkboxes = this.checklist();
    const formArray = this._formBuilder.array(
      checkboxes.map(checkbox => this._formBuilder.control(checkbox.isSelected))
    );

    this.thirdFormGroup = this._formBuilder.group({
      clock: formArray,
    });

    formArray.valueChanges.subscribe((selectedAuthors) => {
      const selectedAuthorNames = checkboxes
        .filter((checkbox, index) => selectedAuthors[index])
        .map(selectedAuthor => selectedAuthor.value);
  
      console.log('Selected Clock Names:', selectedAuthorNames);
    });
  }


  isClockPositionSelected = false;
  updateClockPositionSelection(event: MatCheckboxChange) {
    this.isClockPositionSelected = event.checked;
  }

  showOtherField: boolean = false;
  onRadioChange(event: MatRadioChange) {
    if (event.value === '4') {
      this.showOtherField = true;
    } else {
      this.showOtherField = false;
    }
  }

  checklist(): any[] {
    return [
      { id: 1, value: '1 o clock', isSelected: false },
      { id: 2, value: '2 o clock', isSelected: false },
      { id: 3, value: '3 o clock', isSelected: false },
      { id: 4, value: '4 o clock', isSelected: false },
      { id: 5, value: '5 o clock', isSelected: false },
      { id: 6, value: '6 o clock', isSelected: false },
      { id: 7, value: '7 o clock', isSelected: false },
      { id: 8, value: '8 o clock', isSelected: false },
      { id: 9, value: '9 o clock', isSelected: false },
      { id: 10, value: '10 o clock', isSelected: false },
      { id: 11, value: '11 o clock', isSelected: false },
      { id: 12, value: '12 o clock', isSelected: false }
    ];
  }

}