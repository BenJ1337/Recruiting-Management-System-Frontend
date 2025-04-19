import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function requireNotBlank(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (typeof value === 'string' && value.trim() === '') {
            return { requiredNotBlank: true };
        }
        return null;
    }
}