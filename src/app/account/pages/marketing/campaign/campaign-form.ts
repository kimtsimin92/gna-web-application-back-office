import { FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export class CampaignForm {
  segment_id = new FormControl(null, [
    Validators.required,
  ]);
  lien = new FormControl(null, [
    Validators.required,
  ]);
  texte_lien = new FormControl(null, [
    Validators.required,
    Validators.minLength(2),
  ]);
  libelle = new FormControl(null, [
    Validators.required,
    Validators.minLength(2),
  ]);
  date_debut = new FormControl(null, [
    Validators.required,
    
  ]);
  date_fin = new FormControl(null, [
    Validators.required,
    
  ]);
  message = new FormControl(null, [
    Validators.required,
    Validators.minLength(2),
  ]);
  image = new FormControl(null); // Pas de validation pour le moment
  
}


export function dateRangeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const startDate = control.get('date_debut')?.value;
    const endDate = control.get('date_fin')?.value;

    if (!startDate || !endDate) {
      return null; // ne pas valider si l'une des dates est manquante
    }

    return endDate > startDate ? null : { dateRange: true };
  };
}
