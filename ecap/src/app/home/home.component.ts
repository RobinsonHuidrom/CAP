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
import {MatListModule} from '@angular/material/list';
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
    MatListModule,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {

  isClockEnabled!: boolean;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  fourthFormGroup!: FormGroup;
  fifthFormGroup!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initFirstFormGroup();
    this.initSecondFormGroup();
    this.initThirdFormGroup();
    this.initFourthFormGroup();
    this.initFifthFormGroup();
  }

  private initFirstFormGroup(): void {
    this.firstFormGroup = this._formBuilder.group({
      name: [''],
      age: [''],
      gender: [''],
      labNo: [''],
      address: [''],
    });
  }

  private initSecondFormGroup(): void {
    this.secondFormGroup = this._formBuilder.group({
      procedure: [''],
      comment: [''],
      direction: [''],
    });
  }

  private initThirdFormGroup(): void {
  
    const tumorList = this.fetchTumorList();
    const checkboxes = this.fetchClockList();
  
    const tumorFormArray = this._formBuilder.array(
      tumorList.map((tumor) => this._formBuilder.control(false))
    );
  
    const clockFormArray = this._formBuilder.array(
      checkboxes.map((checkbox) => this._formBuilder.control(false))
    );
  
    this.thirdFormGroup = this._formBuilder.group({
      tumorSites: tumorFormArray,
      clock: clockFormArray,
      distance: [''],
      distance2: [''],
      clockRadio: [''],
      tumorRadio: ['']
    });
  
    // Subscribe to changes in both tumorSites and clock FormArrays
    tumorFormArray.valueChanges.subscribe((selectedTumors) => {
      const selectedTumorValues = tumorList
        .filter((tumor, index) => selectedTumors[index])
        .map((tumor) => tumor.value);
      console.log('Selected Tumor Names:', selectedTumorValues);
    });
  
    clockFormArray.valueChanges.subscribe((selectedClocks) => {
      const selectedClockValues = checkboxes
        .filter((checkbox, index) => selectedClocks[index])
        .map((checkbox) => checkbox.value);
      console.log('Selected Clock Names:', selectedClockValues);
    });
  }

  private initFourthFormGroup(): void {
    this.fourthFormGroup = this._formBuilder.group({
      dimension: [''],
      dimension2: [''],
      tumorSize: [''],
      tumorSizeComment: ['']
    });
  }

  private initFifthFormGroup(): void {
    this.fifthFormGroup = this._formBuilder.group({
      histologic:[''],
      cellularity:[''],
      atypia:[''],
      overGrowth:[''],
      mitoticRate:[''],
      tumorBorder:['']
    });
  }

 // Below codes are functions of respective stepper form

  isClockPositionSelected = false;
  updateClockPositionSelection(event: MatCheckboxChange) {
    this.isClockPositionSelected = event.checked;
  }

  resetTumorValues(event: MatCheckboxChange) {
    if (event.checked) {
      const tumorRadioControl = this.thirdFormGroup.get('tumorRadio');
  
      if (tumorRadioControl) {
        const tumorRadioValue = tumorRadioControl.value;
        // Reset the entire form except for the tumorRadio control
        this.thirdFormGroup.reset();
        // Set the value back to the tumorRadio control
        tumorRadioControl.setValue(tumorRadioValue, { emitEvent: false });
      }
    } else {
      // Enable the entire thirdFormGroup
      this.thirdFormGroup.enable({ emitEvent: false });
    }
  }


  showOtherField: boolean = false;
  onRadioChange(event: MatRadioChange) {
    if (event.value === 'Other (specify)') {
      this.showOtherField = true;
    } else {
      this.showOtherField = false;
    }
  }

  showComment: boolean = false;
  showDimension: boolean = false;
  onChange(event: MatRadioChange) {
    this.showComment = false;
    this.showDimension = false;
  
    if (event.value === 'Cannot be determined') {
      this.showComment = true;
    } else {
      this.showDimension = true;
    }
  }

  showMitoticRate: boolean = false;
  onMitoticChange(event: MatRadioChange) {
    if (event.value === 'Mitotic') {
      this.showMitoticRate = true;
    } else {
      this.showMitoticRate = false;
    }
  }


// Below code section is function to preview 

  getPreviewValues(): string {
    const firstStepValues = this.firstFormGroup.value;
    const secondStepValues = this.secondFormGroup.value;
    const thirdStepValues = this.thirdFormGroup.value;
    const fourthStepValues = this.fourthFormGroup.value;
  
    const selectedTumorValues = this.getSelectedValues(
      thirdStepValues.tumorSites,
      this.fetchTumorList()
    );
   
    const selectedClocks = this.getSelectedValues(
      thirdStepValues.clock,
      this.fetchClockList()
    );


    const tumorRadioValue = thirdStepValues.tumorRadio;
    const tumorSiteDisplayValue = tumorRadioValue ? 'Not Specified' : selectedTumorValues.join(', ');
  
    const preview = `
      Patient Details:
      Name: ${firstStepValues.name}
      Age: ${firstStepValues.age}
      LAB Number: ${firstStepValues.labNo}
      Gender:  ${firstStepValues.gender}
      Address: ${firstStepValues.address}
  
      Specimen:
      Procedure: ${secondStepValues.procedure}
      Comment: ${secondStepValues.comment}
      Specimen Laterality: ${secondStepValues.direction}
  
      Tumor:
      Tumor Site:  ${tumorSiteDisplayValue}
      Clock Position: ${selectedClocks.join(', ')}
      Distance from Nipple: ${thirdStepValues.distance}
      Other: ${thirdStepValues.distance2}   

      Tumor Size: 
      Greatest dimension in Millimeters (mm):${fourthStepValues.dimension}
      Additional Dimension in Millimeters (mm):${fourthStepValues.dimension2}
      Cannot be determined (explain):${fourthStepValues.commentTumorSize }
    `;
  
    return preview;
  }

  private getSelectedValues(selectedItems: boolean[], itemList: any[]): string[] {
    return selectedItems
      .map((isSelected: boolean, index: number) => (isSelected ? itemList[index].value : null))
      .filter((value: string | null) => value !== null);
  }


// Below codes are for data retrival functions or fixed data sets  

  fetchTumorList(): any[] {
    return [ 
      { id: 1, value: 'Upper outer quadrant', isSelected: false },
      { id: 2, value: 'Lower outer quadrant', isSelected: false },
      { id: 3, value: 'Upper inner quadrant', isSelected: false },
      { id: 4, value: 'Lower inner quadrant', isSelected: false },
      { id: 5, value: 'Central', isSelected: false },
      { id: 6, value: 'Nipple', isSelected: false },
    ];
  }

  fetchClockList(): any[] {
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
      { id: 12, value: '12 o clock', isSelected: false },
    ];
  }
}

