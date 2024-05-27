import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
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
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { SaveNotificationDialogComponent } from '../../../../dialogs/notification/save-notification-dialog/save-notification-dialog.component';
import { EditLoadingDialogComponent } from '../../../../dialogs/loading/edit-loading-dialog/edit-loading-dialog.component';

import { format } from 'date-fns';
import { CampaignService } from '../campaign.service';
import { ImageModule } from 'primeng/image';
import { DropdownModule } from 'primeng/dropdown';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CalendarModule } from 'primeng/calendar';
import { NgIf } from '@angular/common';

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
    CheckboxModule,
    ImageModule,
    KeyFilterModule,
    DropdownModule,
    CalendarModule,
    NgIf,
  ],
  templateUrl: './campaign-edit.component.html',
  styleUrl: './campaign-edit.component.css',
})
export class CampaignEditComponent implements OnInit, OnDestroy {
  headerTitle: string | undefined;

  formData: FormGroup = new FormGroup({}, undefined, undefined);
  dataForm: CampaignForm = new CampaignForm();
  isSave: boolean = false;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  campaignData: any = null;
  minDate: Date | undefined;
  selectedFile: File | null = null;
  elementData: any;

  // @ts-ignore
  campaignImageFile: File = null;

  campaignImageUrl: any = null;
  imageErrorMessage: string = '';

  segmentList: any[] = [];

  constructor(
    private _fb: FormBuilder,
    public _dialog: MatDialog,
    private _router: Router,
    public accountService: AccountService,
    private campaignService: CampaignService
  ) {}

  ngOnInit(): void {
    this.minDate = new Date();
    this.onGetSegmentList();

    if (localStorage.getItem('CAMPAIGN_DATA')) {
      // @ts-ignore
      this.elementData = JSON.parse(localStorage.getItem('CAMPAIGN_DATA'));
    } else {
      this._router.navigateByUrl('/account/marketing/campaigns/list');
    }

    if (localStorage.getItem('APP_HEADER_TITLE')) {
      localStorage.removeItem('APP_HEADER_TITLE');
    }

    this.headerTitle = 'Marketing';
    localStorage.setItem('APP_HEADER_TITLE', this.headerTitle);

    this.home = { icon: 'pi pi-home', routerLink: '/account/home' };

    this.items = [
      { label: 'Gestion Listes' },
      { label: 'Segments' },
      { label: 'Modification' },
    ];

    if (localStorage.getItem('CAMPAIGN_DATA')) {
      // @ts-ignore
      this.elementData = JSON.parse(localStorage.getItem('CAMPAIGN_DATA'));
      this.dataForm.libelle.setValue(this.elementData.libelle);
      this.dataForm.date_debut.setValue(this.elementData.date_debut);
      this.dataForm.date_fin.setValue(this.elementData.date_fin);
      this.dataForm.lien.setValue(this.elementData.lien);
      this.dataForm.texte_lien.setValue(this.elementData.texte_lien);
      this.dataForm.segment_id.setValue(this.elementData.segment_id);
      this.dataForm.message.setValue(this.elementData.message);
      this.dataForm.image.setValue(this.elementData.image);
      this.dataForm.selected.setValue(this.elementData.is_active);
    } else {
      this._router.navigateByUrl('/account/marketing/campaigns/list');
    }

    this.formData = this._fb.group(this.dataForm);
  }

  onGetSegmentList() {
    this.accountService.pageLoading = true;
    this.accountService.getSegmentList().subscribe(
      (responseData: HttpResponse<any>) => {
        this.accountService.pageLoading = false;
        console.log(responseData);
        this.segmentList = responseData['body'];
      },
      (errorData: HttpErrorResponse) => {
        this.accountService.pageLoading = false;
        console.log(errorData);
      }
    );
  }

  ngOnDestroy(): void {
    if (localStorage.getItem('APP_HEADER_TITLE')) {
      localStorage.removeItem('APP_HEADER_TITLE');
    }
    if (localStorage.getItem('CAMPAIGN_DATA')) {
      localStorage.removeItem('CAMPAIGN_DATA');
    }
  }

  onGoToBack() {
    this._router.navigateByUrl('/account/marketing/campaigns/list');
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
    console.log(this.selectedFile);
  }

  private onSave() {
    this.isSave = true;

    this.onSaveLoadingDialog();

    //this.getcampaignImageFile()
    const segmentId = parseInt(this.formData.value.segment_id.id as string, 10);

    // Format dates to 'YYYY-MM-DD'
    const dateDebut = format(
      new Date(this.formData.value.date_debut),
      'yyyy-MM-dd'
    );
    const dateFin = format(
      new Date(this.formData.value.date_fin),
      'yyyy-MM-dd'
    );

    let requestData = new FormData();
    requestData.append('segment_id', segmentId.toString());
    requestData.append('lien', this.formData.value.lien);
    requestData.append('texte_lien', this.formData.value.texte_lien);
    requestData.append('libelle', this.formData.value.libelle);
    requestData.append('date_debut', dateDebut);
    requestData.append('date_fin', dateFin);
    requestData.append('message', this.formData.value.message);
    if (this.selectedFile) {
      requestData.append('image', this.selectedFile, this.selectedFile.name);
    }
    requestData.append('statut', (1).toString());
    requestData.append('is_active', this.formData.value.is_active);
    requestData.append('updated_user', (1).toString());

    console.log(requestData);

    this.campaignService
      .onEditCampaign(this.elementData.id, requestData)
      .subscribe(
        (responseData) => {
          this.isSave = false;
          console.log(responseData);
          this.closeDialog();
          this.onSaveNotificationDialog();
        },
        (error: HttpErrorResponse) => {
          this.isSave = false;
          console.log(error);
          this.closeDialog();
          this.onSaveErrorNotificationDialog(error);
        }
      );
  }
  onSaveLoadingDialog(): void {
    const dialogRef = this._dialog.open(EditLoadingDialogComponent, {
      hasBackdrop: false,
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onSaveNotificationDialog(): void {
    const dialogRef = this._dialog.open(SaveNotificationDialogComponent, {
      hasBackdrop: false,
      width: '440px',
      data: {
        dialogMessage: 'La modification de la campagne a réussi.',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

      this._router
        .navigateByUrl('/account/campaign/campaigns/list')
        .then(() => {});
    });
  }

  onSaveErrorNotificationDialog(error: HttpErrorResponse): void {
    const dialogRef = this._dialog.open(SaveErrorNotificationDialogComponent, {
      hasBackdrop: false,
      width: '440px',
      data: {
        httpError: error,
        dialogMessage: 'La modification de la campagne a échoué.',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
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
        dialogMessage: 'de cette campagne',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
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

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
