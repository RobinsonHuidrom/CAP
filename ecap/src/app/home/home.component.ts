
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioChange, MatRadioModule} from '@angular/material/radio';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import { Subscription } from 'rxjs';


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
    MatIconModule,
    CommonModule,
    
 ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {

  allComplete = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  fourthFormGroup!: FormGroup; 
  fifthFormGroup!: FormGroup;
  isClockSubtaskDisabled = true;
  disableCheckboxes = false;
  notSpecifiedSelected = false;

  private formSubscription!: Subscription;

  
  // Define arrays for directions and distance options
  directions: { controlName: string, value: string, label: string }[] = [
    { controlName: 'anterior', value: 'anterior', label: 'Anterior' },
    { controlName: 'posterior', value: 'posterior', label: 'Posterior' },
    { controlName: 'superiorClosest', value: 'superior-closest', label: 'Superior' },
    { controlName: 'inferiorClosest', value: 'inferior-closest', label: 'Inferior' },
    { controlName: 'medialClosest', value: 'medial-closest', label: 'Medial' },
    { controlName: 'lateralClosest', value: 'lateral-closest', label: 'Lateral' },
    { controlName: 'otherMarginClosestText', value: 'other-Margin-Closest-Text', label: 'Other (specify):'  },
    { controlName: 'cannotDetermineMarginClosestText', value: 'cannot-Determine-Margin-Closest-Text', label: 'Cannot be determined (explain):' }
  ];

  distanceOptions: { controlName: string, value: string, label: string }[] = [
    { controlName: 'exactDistance', value: 'exact-distance', label: 'Exact distance:' },
    { controlName: 'lessThan', value: 'less-than', label: 'Less than:' },
    { controlName: 'greaterThan', value: 'greater-than', label: 'Greater than:' },
    { controlName: 'otherDistanceText', value: 'other-distance-text', label: 'Other (specify):' },
    { controlName: 'cannotDetermineDistanceText', value: 'cannot-determine-distance-text', label: 'Cannot be determined (explain):' }
  ];

  phyllodesMarginOptions: { controlName: string, value: string, label: string }[] = [
    { controlName: 'involvedAnteriorPresent', value: 'involved-anterior-present', label: 'Anterior' },
    { controlName: 'involvedPosteriorPresent', value: 'involved-posterior-present', label: 'Posterior' },
    { controlName: 'superiorPresent', value: 'superior-present', label: 'Superior' },
    { controlName: 'inferiorPresent', value: 'inferior-present', label: 'Inferior' },
    { controlName: 'medialPresent', value: 'medial-present', label: 'Medial' },
    { controlName: 'lateralPresent', value: 'lateral-present', label: 'Lateral' },
    { controlName: 'otherMarginPresentText', value: 'other-Margin-Present-Text', label: 'Other (specify):'  },
    { controlName: 'cannotDetermineMarginPresentText', value: 'cannot-Determine-Margin-Present-Text', label: 'Cannot be determined (explain):' }
  ];

  constructor(private _formBuilder: FormBuilder, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initFirstFormGroup();
    this.initSecondFormGroup();
    this.initThirdFormGroup();
    this.initFourthFormGroup();
    this.initFifthFormGroup();
    this.subscribeToAllMarginsNegativeChanges();
    this.subscribeToPhyllodesPresentChanges(); 
    this.subscribeToFormChanges();
  }

  ngOnDestroy(): void {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }

  private initFirstFormGroup(): void {
    this.firstFormGroup = this._formBuilder.group({
      procedure: [''],
      comment: [''],
      direction: ['']
    });
  }

  private initSecondFormGroup(): void {
    this.secondFormGroup = this._formBuilder.group({
      marginsPresent: false,
      upperOuterQuadrant: { value: false, disabled: true },
      lowerOuterQuadrant: { value: false, disabled: true },
      upperInnerQuadrant: { value: false, disabled: true },
      lowerInnerQuadrant: { value: false, disabled: true },
      central: { value: false, disabled: true },
      nipple: { value: false, disabled: true },
      clockPositionPresent: { value: false, disabled: true },
      oneClock: { value: false, disabled: true },
      twoClock: { value: false, disabled: true },
      threeClock: { value: false, disabled: true },
      distFromNipple: { value: false, disabled: true },
      distFromNippleText: '',
      otherPresentSpecify: { value: false, disabled: true },
      otherPresentSpecifyText: '',
      notSpecified: false
      
    });
  }

  private initThirdFormGroup(): void {
    this.thirdFormGroup = this._formBuilder.group({
      tumorSizeOption: [''],
      greatestDimension: [''],
      cannotDetermineExplanation: [''],
      additionalDimensionChecked: [false],
      additionalDimensionX: [''],
      additionalDimensionY: ['']
    });
  }
  

  private initFourthFormGroup(): void {
    this.fourthFormGroup = this._formBuilder.group({
      histologic:[''],
      cellularity:[''],
      atypia:[''],
      overGrowth:[''],
      mitotic:[''],
      mitoticRate:[''],
      tumorBorder:[''],
      infiltrativeExtent: [''], // Add the nested control
      malignant:[''],
      commentMalignant:['']
    });
  }


  private initFifthFormGroup(): void {
    this.fifthFormGroup = this._formBuilder.group({
      allMarginsNegative: false,
      anterior: false,
      posterior: false,
      superiorClosest: false,
      inferiorClosest: false,
      medialClosest: false,
      lateralClosest: false,
      otherMarginClosestText: '',
      cannotDetermineMarginClosestText: '',
      exactDistance: '',
      lessThan: '',
      greaterThan: '',
      otherDistanceText: '',
      cannotDetermineDistanceText: '',
      phyllodesPresent: false,
      involvedAnteriorPresent: false,
      involvedPosteriorPresent: false,
      superiorPresent: false,
      inferiorPresent: false,
      medialPresent: false,
      lateralPresent: false,
      otherMarginPresentText: '',
      cannotDetermineMarginPresentText: '',
      other: '',
      otherText: '',
      cannotDetermine: '',
      cannotDetermineText: '',
    });
  }

  // -----------------------------Functions of Tumor Site or  secondFormGroup --------------------------------------------------
  private subscribeToFormChanges(): void {

    this.formSubscription = this.secondFormGroup.valueChanges.subscribe(values => {
      console.log('Form values:', values);
    });

    this.secondFormGroup.get('marginsPresent')?.valueChanges.subscribe(value => {
      if (!value) {
        // If the parent checkbox is not selected, disable all inner checkboxes
        this.disableInnerCheckboxes();
      } else {
        // If the parent checkbox is selected, enable all inner checkboxes
        this.enableInnerCheckboxes();
      }
    });
    // Ensure the "Not specified" checkbox is always enabled
    this.secondFormGroup.get('notSpecified')?.enable();
  }
  
  private disableInnerCheckboxes(): void {
    Object.keys(this.secondFormGroup.controls)
      .filter(controlName => controlName !== 'marginsPresent' && controlName !== 'notSpecified')
      .forEach(controlName => {
        this.secondFormGroup.controls[controlName].disable();
      });
  }
  
  private enableInnerCheckboxes(): void {
    Object.keys(this.secondFormGroup.controls)
      .filter(controlName => controlName !== 'marginsPresent')
      .forEach(controlName => {
        this.secondFormGroup.controls[controlName].enable();
      });
  }

 // Function to handle click event on "Not specified" checkbox
 toggleAllCheckboxes(): void {
  const notSpecifiedControl = this.secondFormGroup.get('notSpecified');
   if (notSpecifiedControl) {
    const notSpecifiedValue = notSpecifiedControl.value;
     Object.keys(this.secondFormGroup.controls)
      .filter(controlName => controlName !== 'notSpecified')
      .forEach(controlName => {
        const control = this.secondFormGroup.controls[controlName];
        if (notSpecifiedValue) {
          control.disable();
        } else if (controlName === 'marginsPresent') {
          control.enable(); // Enable the parent checkbox
        }
      });
    if (notSpecifiedValue) {
      this.secondFormGroup.reset({
        notSpecified: true
      });
    }
  }
 }
 
 // -----------------------------End of functions of Tumor Site or  secondFormGroup -------------------------------->>>>>>>>>>>>>>>>>



  // ---------------------------- For FirstFormGroup Other specify comment  ----------------------------------------------------
  showOtherField: boolean = false;
  onRadioChange(event: MatRadioChange) {

    this.showOtherField = event.value === 'Other';

    // If not selecting "Other", clear the comment value
    if (!this.showOtherField) {
      this.secondFormGroup.get('comment')?.setValue(null);
    }

    if (event.value === 'Other') {
      this.showOtherField = true;
    } else {
      this.showOtherField = false;
    }

    this.cdRef.detectChanges(); // Trigger change detection
  }
  
  
// ---------------------------- For FourthFormGroup Other specify comment  -------------------------------------->>>>>>>
  showMitoticRate: boolean = false;
  onMitoticChange(event: MatRadioChange) {
    if (event.value === 'Mitotic') {
      this.showMitoticRate = true;
    } else {
      this.showMitoticRate = false;
    }

    if (!this.showMitoticRate) {
      this.fourthFormGroup.get('mitoticRate')?.setValue(null);
    }

    this.cdRef.detectChanges(); // Trigger change detection
  }


// ---------------------------- For FifthFormGroup Other specify comment  -------------------------------------------------------

private subscribeToAllMarginsNegativeChanges(): void {
  this.fifthFormGroup.get('allMarginsNegative')?.valueChanges.subscribe(value => {
    if (value) {
      this.fifthFormGroup.get('closestMarginSectionVisible')?.setValue(true);
      this.fifthFormGroup.get('distanceMarginSectionVisible')?.setValue(true);
    } else {
      this.fifthFormGroup.get('closestMarginSectionVisible')?.setValue(false);
      this.fifthFormGroup.get('distanceMarginSectionVisible')?.setValue(false);
    }
  });
}

private subscribeToPhyllodesPresentChanges(): void {
  this.fifthFormGroup.get('phyllodesPresent')?.valueChanges.subscribe(value => {
    if (value) {
      this.fifthFormGroup.get('phyllodesMarginSectionVisible')?.setValue(true);
    } else {
      this.fifthFormGroup.get('phyllodesMarginSectionVisible')?.setValue(false);
    }
  });
}


resetChildControls(controlName: string) {
  if (!this.fifthFormGroup.get(controlName)?.value) {
    // Reset child controls when the parent checkbox is unselected
    switch (controlName) {
      case 'allMarginsNegative':
        // Reset child controls related to 'allMarginsNegative'
        this.fifthFormGroup.patchValue({
          // Reset values for inner checkboxes
          anterior: false,
          posterior: false,
          superiorClosest: false,
          inferiorClosest: false,
          medialClosest: false,
          lateralClosest: false,
          otherMarginClosestText: '',
          cannotDetermineMarginClosestText: '',
          // Reset values for distance radio buttons
          exactDistance: '',
          lessThan: '',
          greaterThan: '',
          otherDistanceText: '',
          cannotDetermineDistanceText: ''
        });
        break;
      case 'phyllodesPresent':
        // Reset child controls related to 'phyllodesPresent'
        this.fifthFormGroup.patchValue({
          // Reset values for inner checkboxes
          involvedAnteriorPresent: false,
          involvedPosteriorPresent: false,
          superiorPresent: false,
          inferiorPresent: false,
          medialPresent: false,
          lateralPresent: false,
          otherMarginPresentText: '',
          cannotDetermineMarginPresentText: ''
        });
        break;
      case 'other':
        // Reset value for 'otherText' input
        this.fifthFormGroup.patchValue({
          otherText: ''
        });
        break;
      case 'cannotDetermine':
        // Reset value for 'cannotDetermineText' input
        this.fifthFormGroup.patchValue({
          cannotDetermineText: ''
        });
        break;
      default:
        break;
    }
  }
}

// -------------------------------------- End of FifthFormGroup Other specify comment --------------------------------->>>>>>>>
 
}