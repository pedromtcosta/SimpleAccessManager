import { GenericValidator } from './generic-validator';
import { AfterViewInit, ElementRef, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormControlName, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

export abstract class BaseEditComponent implements AfterViewInit {
    protected genericValidator: GenericValidator;
    public displayMessage: { [key: string]: string } = {};

    abstract get formGroup(): FormGroup
    abstract set formGroup(form: FormGroup)

    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    ngAfterViewInit(): void {
        // Watch for the blur event from any input element on the form.
        const controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        Observable.merge(this.formGroup.valueChanges, ...controlBlurs).debounceTime(500).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.formGroup);
        });
    }
}
