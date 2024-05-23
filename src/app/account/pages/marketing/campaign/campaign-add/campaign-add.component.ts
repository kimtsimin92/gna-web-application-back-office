import { NgIf, DecimalPipe } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatOption } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormField, MatLabel, MatHint, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatSelect } from '@angular/material/select';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MultiSelectModule } from 'primeng/multiselect';
import { CampaignService } from '../campaign.service';
import { MenuItem } from 'primeng/api';
import { AccountService } from '../../../../account.service';
import { ConfirmationAddDialogComponent } from '../../../../dialogs/confirmation/confirmation-add-dialog/confirmation-add-dialog.component';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { SaveNotificationDialogComponent } from '../../../../dialogs/notification/save-notification-dialog/save-notification-dialog.component';
import { SaveErrorNotificationDialogComponent } from '../../../../dialogs/notification/save-error-notification-dialog/save-error-notification-dialog.component';
import { NotBlankDialogComponent } from '../../../../dialogs/not-blank-dialog/not-blank-dialog.component';
import { SaveLoadingDialogComponent } from '../../../../dialogs/loading/save-loading-dialog/save-loading-dialog.component';
import { CampaignForm, dateRangeValidator } from '../campaign-form';
import { ImageModule } from 'primeng/image';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-campaign-add',
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
    MatOption,
    MatSelect,
    MatHint,
    MatError,
    NgIf,
    MatTab,
    MatTabGroup,
    EditorModule,
    MatRadioButton,
    MatRadioGroup,
    InputTextModule,
    KeyFilterModule,
    DropdownModule,
    MultiSelectModule,
    InputTextareaModule,
    DecimalPipe,
    ImageModule,
    CalendarModule,
    CheckboxModule
  ],
  templateUrl: './campaign-add.component.html',
  styleUrl: './campaign-add.component.css'
})
export class CampaignAddComponent  implements OnInit, OnDestroy, AfterViewInit{
  headerTitle: string | undefined;

  formData: FormGroup = new FormGroup({}, undefined, undefined);
  dataForm: CampaignForm = new CampaignForm()

  formDataItem: FormGroup = new FormGroup({}, undefined, undefined);
  dataItemForm: any 

  isSave: boolean = false;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  guaranteeData: any = null;
  loadingPage: boolean = false;

  yesOrNoList: any[] = [
    {
      value: true,
      name: "Oui",
    },
    {
      value: false,
      name: "Non",
    },
  ];
  segmentList: any[] = [];

  // @ts-ignore
  campaignImageFile: File = null;

  campaignImageUrl: any = null;
  // @ts-ignore
  advertisementObjectFile: File = null;
  productData: any = null;

  // @ts-ignore
  imageErrorMessage: string = null;

  // @ts-ignore
  objectFileErrorMessage: string = null;

  dateDebut: Date | null = null;
  dateFin: Date | null = null;


  userData: any = null;

  constructor(
    private _fb: FormBuilder,
    public _dialog: MatDialog,
    private _router: Router,
    public accountService: AccountService,
    public campaignService: CampaignService,
  ) {

  }
  ngAfterViewInit(): void {
  }
 

  ngOnInit(): void {
   
    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }

    this.headerTitle = "Marketing";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);


    if (localStorage.getItem("CAMPAIGN_DATA")) {
      // @ts-ignore
      this.segmentData = JSON.parse(localStorage.getItem("CAMPAIGN_DATA"));
    }
    if (localStorage.getItem("USER_PROFILE_DATA")) {
      // @ts-ignore
      this.userData = JSON.parse(localStorage.getItem("USER_PROFILE_DATA"));
      console.log(this.userData);
    }

    
    this.headerTitle = "Campagnes";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);

    this.home = { icon: 'pi pi-home', routerLink: '/account/home' };

    this.items = [{ label: 'Campagne ' }, { label: 'Campagne'}, {label: "Création"}];


    this.formData = this._fb.group(this.dataForm, { validators: dateRangeValidator() });
    //this.formDataItem = this._fb.group(this.dataItemForm);
    this.onGetSegmentList()
  }

  onGetSegmentList() {
    this.accountService.pageLoading = true;
    this.accountService.getSegmentList()
      .subscribe((responseData: HttpResponse<any>) => {
        this.accountService.pageLoading = false;
        console.log(responseData);
        this.segmentList = responseData["body"];
      }, (errorData: HttpErrorResponse) => {
        this.accountService.pageLoading = false;
        console.log(errorData);
      });
  }

  getcampaignImageFile() {

    // @ts-ignore
    this.imageErrorMessage = null;

    const input = document.getElementById('campaignImageFile')

    // @ts-ignore
    input.addEventListener('change', () => {

      console.log(input);

      // @ts-ignore
      let filePath = input.value;

      // @ts-ignore
      let file = input.files[0];
      console.log(file);

      if (file) {

        const mimeType = file.type;
        let maxSize = 2 * 1024 * 1024; // 2 Mo en octets

        const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

        if (!allowedExtensions.exec(filePath)) {
          // @ts-ignore
          input.value = null;
          // @ts-ignore
          this.campaignImageFile = null;
          this.campaignImageUrl = null;
          this.imageErrorMessage = "jpg, jpeg ou png type *"
          return false;
        }

        if (file.size > maxSize) {
          // @ts-ignore
          input.value = null;
          // @ts-ignore
          this.campaignImageFile = null;
          this.campaignImageUrl = null;
          this.imageErrorMessage = "2 Mo taille maximum *"
          return false;
        }

        this.campaignImageFile = file;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
          this.campaignImageUrl = reader.result;
        }

        // @ts-ignore
        this.imageErrorMessage = null;

      } else {
        // @ts-ignore
        input.value = null;
        // @ts-ignore
        this.campaignImageFile = null;
        this.campaignImageUrl = null;
        // @ts-ignore
        this.imageErrorMessage = null;
      }

    });
  }


  ngOnDestroy(): void {
  }

  onGoToBack() {
    this._router.navigateByUrl("/account/marketing/campaigns/list");
  }

  onConfirm(): void {

    this.isSave = true;
    this.accountService.isSave = this.isSave;

    const dialogRef = this._dialog.open(ConfirmationAddDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      height: '340px',
      data: {
        dialogMessage: "de cette garantie"
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


  closeDialog() {
    this._dialog.closeAll();
  }


  onGetNotBlankAlert() {
    const dialogRef = this._dialog.open(NotBlankDialogComponent, {
      width: '440px',
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  onSaveNotificationDialog(): void {

    const dialogRef = this._dialog.open(SaveNotificationDialogComponent, {
      hasBackdrop: false,
      width: '440px',
      data: {
        dialogMessage: "L'enregistrement de la campagne a réussi."
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

      this._router.navigateByUrl("/account/marketing/campaigns/list")
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
        dialogMessage: "L'enregistrement de la campagne a échoué."
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

    });

  }

  private onSave() {

    this.isSave = true;
    console.log(this.formData.value);

    this.getcampaignImageFile()

    let requestData = {
      segment_id: this.formData.value.segment_id.id,
      lien: this.formData.value.lien,
      texte_lien: this.formData.value.texte_lien,
      libelle: this.formData.value.libelle,
      date_debut: this.formData.value.date_debut,
      date_fin: this.formData.value.date_fin,
      message: this.formData.value.message,
      image: this.campaignImageUrl,
      created_user: 1,
      is_active: this.formData.value.selected,
      statut: 1

    }

    console.log(requestData);
    this.campaignService.onSaveCampaign(requestData)
      .subscribe((responseData) => {
        this.isSave = false;
        console.log(responseData);
        this.closeDialog();
        this.onSaveNotificationDialog();

      }, (error: HttpErrorResponse) => {
        this.isSave = false;
        console.log(error);
        this.closeDialog();
        this.onSaveErrorNotificationDialog(error);
      });
    

  }


}
