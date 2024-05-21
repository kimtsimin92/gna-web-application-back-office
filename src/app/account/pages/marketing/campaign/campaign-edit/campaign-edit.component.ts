import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { CampaignForm } from '../campaign-form';
import { MenuItem } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../../../../account.service';
import { NotBlankDialogComponent } from '../../../../dialogs/not-blank-dialog/not-blank-dialog.component';
import { ConfirmationEditDialogComponent } from '../../../../dialogs/confirmation/confirmation-edit-dialog/confirmation-edit-dialog.component';
import { SaveErrorNotificationDialogComponent } from '../../../../dialogs/notification/save-error-notification-dialog/save-error-notification-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { SaveNotificationDialogComponent } from '../../../../dialogs/notification/save-notification-dialog/save-notification-dialog.component';
import { EditLoadingDialogComponent } from '../../../../dialogs/loading/edit-loading-dialog/edit-loading-dialog.component';

@Component({
  selector: 'app-campaign-edit',
  standalone: true,
    imports: [
        BreadcrumbModule,
        FormsModule,
        MatButton,
        MatCard,
        MatCardContent,
        MatCardHeader,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule,
        InputTextModule,
        CheckboxModule
    ],
  templateUrl: './campaign-edit.component.html',
  styleUrl: './campaign-edit.component.css'
})
export class CampaignEditComponent implements OnInit, OnDestroy{

  
  headerTitle: string | undefined;

  formData: FormGroup = new FormGroup({}, undefined, undefined);
  dataForm: CampaignForm = new CampaignForm();
  isSave: boolean = false;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  campaignData: any = null;

  
  constructor(
    private _fb: FormBuilder,
    public _dialog: MatDialog,
    private _router: Router,
    public accountService: AccountService) {
  }


  ngOnInit(): void {

    if (localStorage.getItem("CAMPAIGN_DATA")) {
      // @ts-ignore
      this.segmentData = JSON.parse(localStorage.getItem("CAMPAIGN_DATA"));
    } else {
      this._router.navigateByUrl("/account/marketing/campaigns/list")
    }

    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }

    this.headerTitle = "Marketing";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);

    this.home = { icon: 'pi pi-home', routerLink: '/account/home' };

    this.items = [{ label: 'Gestion Listes' }, { label: 'Segments'}, {label: "Modification"}];

    if (localStorage.getItem("CAMPAIGN_DATA")) {
      // @ts-ignore
      this.segmentData = JSON.parse(localStorage.getItem("CAMPAIGN_DATA"));
      this.dataForm.libelle.setValue(this.campaignData.code);
      this.dataForm.date_debut.setValue(this.campaignData.date_debut);
      this.dataForm.date_fin.setValue(this.campaignData.date_fin);
      this.dataForm.lien.setValue(this.campaignData.lien);
      this.dataForm.texte_lien.setValue(this.campaignData.texte_lien);
      this.dataForm.segment_id.setValue(this.campaignData.segment_id);
      this.dataForm.message.setValue(this.campaignData.message);
    } else {
      this._router.navigateByUrl("/account/marketing/campaigns/list")
    }

    this.formData = this._fb.group(this.dataForm);

  }

  
  ngOnDestroy(): void {
    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }
    if (localStorage.getItem("CAMPAIGN_DATA")) {
      localStorage.removeItem("CAMPAIGN_DATA");
    }
  }

  
  onGoToBack() {
    this._router.navigateByUrl("/account/marketing/campaigns/list");
  }


  private onSave() {

    this.isSave = true;

    this.onSaveLoadingDialog();

    
    let requestData = {
      name: this.formData.value.name,
      description: this.formData.value.description,
      selected: this.formData.value.selected,
    }

    console.log(requestData);



  }
  onSaveLoadingDialog(): void {

    const dialogRef = this._dialog.open(EditLoadingDialogComponent, {
      hasBackdrop: false,
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  onSaveNotificationDialog(): void {

    const dialogRef = this._dialog.open(SaveNotificationDialogComponent, {
      hasBackdrop: false,
      width: '440px',
      data: {
        dialogMessage: "La modification du segment a réussi."
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

      this._router.navigateByUrl("/account/segments/list")
        .then(() => {
        });

    });

  }

  onSaveErrorNotificationDialog(error: HttpErrorResponse): void {

    const dialogRef = this._dialog.open(SaveErrorNotificationDialogComponent, {
      hasBackdrop: false,
      width: '440px',
      data: {
        httpError: error,
        dialogMessage: "La modification du segment a échoué."
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

    });

  }

  closeDialog() {
    this._dialog.closeAll();
  }

  onConfirm(): void {

    this.isSave = true;
    this.accountService.isSave = this.isSave;

    const dialogRef = this._dialog.open(ConfirmationEditDialogComponent, {
      hasBackdrop: false,
      width: '380px',
      height: '350px',
      data: {
        dialogMessage: "de ce segment"
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if (result) {
        this.onSave();
      } else {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

    });

  }

  onGetNotBlankAlert() {
    const dialogRef = this._dialog.open(NotBlankDialogComponent, {
      width: '440px',
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

}
