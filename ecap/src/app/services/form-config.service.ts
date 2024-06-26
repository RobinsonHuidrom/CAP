

// form-config.service.ts

import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, shareReplay, Subject, takeUntil, throwError } from 'rxjs';
import { FormConfig } from '../../assets/form-config';

@Injectable({
  providedIn: 'root',
})

export class FormConfigService implements OnDestroy {
  private readonly unsubscribe$ = new Subject<void>();

  // Combined HTTP request and simplified error handling
  formConfigs$ = this.http.get<FormConfig[]>('http://localhost:3000/api/formConfigs')
  .pipe(
    map(configs => configs),
    catchError(error => {
      console.error('Error loading form configurations:', error);
      return throwError(() => error); // Create and throw the error using a factory function
    }),
    shareReplay(1),
    takeUntil(this.unsubscribe$)
  );

  constructor(private http: HttpClient) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // Declarative method to find a form config by ID
  findFormConfigById(formId: number): Observable<FormConfig | undefined> {
    return this.formConfigs$.pipe(
      map(configs => configs.find(config => config.formId === formId))
    );
  }
}

