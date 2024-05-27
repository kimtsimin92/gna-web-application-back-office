import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GuaranteeForm} from "../guarantee-form";
import {MenuItem} from "primeng/api";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AccountService} from "../../../../account.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {
  EditLoadingDialogComponent
} from "../../../../dialogs/loading/edit-loading-dialog/edit-loading-dialog.component";
import {
  SaveNotificationDialogComponent
} from "../../../../dialogs/notification/save-notification-dialog/save-notification-dialog.component";
import {
  SaveErrorNotificationDialogComponent
} from "../../../../dialogs/notification/save-error-notification-dialog/save-error-notification-dialog.component";
import {
  ConfirmationEditDialogComponent
} from "../../../../dialogs/confirmation/confirmation-edit-dialog/confirmation-edit-dialog.component";
import {NotBlankDialogComponent} from "../../../../dialogs/not-blank-dialog/not-blank-dialog.component";
import {
  GuaranteeClauseEditorDialogComponent
} from "../guarantee-clause-editor-dialog/guarantee-clause-editor-dialog.component";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {DatePipe, DecimalPipe, LowerCasePipe, NgForOf, NgIf} from "@angular/common";
import {ChipModule} from "primeng/chip";
import {MatChipListbox, MatChipOption} from "@angular/material/chips";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {KeyFilterModule} from "primeng/keyfilter";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {MultiSelectModule} from "primeng/multiselect";
import {environment} from "../../../../../../environments/environment";
import {TagModule} from "primeng/tag";

@Component({
  selector: 'app-guarantee-view',
  standalone: true,
  imports: [
    BreadcrumbModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    DecimalPipe,
    NgIf,
    ChipModule,
    MatChipListbox,
    MatChipOption,
    DropdownModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    KeyFilterModule,
    MatTab,
    MatTabGroup,
    MultiSelectModule,
    ReactiveFormsModule,
    DatePipe,
    NgForOf,
    TagModule,
    LowerCasePipe
  ],
  templateUrl: './guarantee-view.component.html',
  styleUrl: './guarantee-view.component.css'
})
export class GuaranteeViewComponent implements OnInit, OnDestroy {

  headerTitle: string | undefined;

  formData: FormGroup = new FormGroup({}, undefined, undefined);
  dataForm: GuaranteeForm = new GuaranteeForm();
  isSave: boolean = false;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  guaranteeData: any = null;

  guaranteeClauses: any;
  private loadingPage: boolean = false;
  isDisable: boolean = true;
  periodList: any[] = [];
  yesOrNoList: any[] = [];
  zoneList: any[] = [];
  partnerList: any[] = [];
  guaranteeItemsData: any;

  constructor(
    private _fb: FormBuilder,
    public _dialog: MatDialog,
    private _router: Router,
    public accountService: AccountService) {
  }

  ngOnInit(): void {

    if (localStorage.getItem("GUARANTEE_DATA")) {
      // @ts-ignore
      this.guaranteeData = JSON.parse(localStorage.getItem("GUARANTEE_DATA"));

      if (this.guaranteeData.deficiencyDeadlineUnit) {
        this.periodList.push(this.guaranteeData.deficiencyDeadlineUnit.name);
      }

      if (this.guaranteeData.zone) {
        this.zoneList.push(this.guaranteeData.zone.name);
      }

      if (this.guaranteeData.discountApplicable) {
        this.yesOrNoList.push("Oui");
      } else {
        this.yesOrNoList.push("Non");
      }

      if (this.guaranteeData.partners && this.guaranteeData.partners.length > 0) {
        this.guaranteeData.partners.forEach((p: any) => {
          this.partnerList.push(p.name);
        });
      }

      if (this.guaranteeData.items) {
        this.guaranteeItemsData = this.guaranteeData.items;
      }

    } else {
      this._router.navigateByUrl("/account/guarantees/list")
    }

    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }

    this.headerTitle = "Configuration des produits";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);

    this.home = { icon: 'pi pi-home', routerLink: '/account/home' };

    this.items = [{ label: 'Configuration Produits' }, { label: 'Garanties'}];

  }

  ngOnDestroy(): void {
    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }
    if (localStorage.getItem("GUARANTEE_DATA")) {
      localStorage.removeItem("GUARANTEE_DATA");
    }
  }

  onBack() {
    this._router.navigateByUrl("/account/settings-products/guarantees/list");
  }

  private onSave() {

    this.isSave = true;

    this.onSaveLoadingDialog();

    let requestData = {
      name: this.formData.value.name,
      taxRate: this.formData.value.taxRate,
      franchiseRate: this.formData.value.franchiseRate,
      franchiseMinimum: this.formData.value.franchiseMinimum,
      franchiseMaximum: this.formData.value.franchiseMaximum,
      deficiencyDeadlineUnitCode: this.formData.value.deficiencyDeadlineUnit,
      deficiencyDeadline: this.formData.value.deficiencyDeadline,
      subscriptionMinimumPeriod: this.formData.value.subscriptionMinimumPeriod,
      subscriptionMaximumPeriod: this.formData.value.subscriptionMaximumPeriod,
      guaranteeFloor: this.formData.value.guaranteeFloor,
      guaranteeCeiling: this.formData.value.guaranteeCeiling,
      premiumMinimum: this.formData.value.premiumMinimum,
      discountApplicable: this.formData.value.discountApplicable,
      zoneId: this.formData.value.zone,
      partnerIds: this.formData.value.partners,
      description: this.formData.value.description,
      clauses: this.guaranteeClauses,
      enabled: this.formData.value.enabled
    }

    let id = this.guaranteeData.id;

    console.log(requestData);

    this.accountService.editGuarantee(requestData, id)
      .subscribe((responseData) => {
        this.isSave = false;
        this.guaranteeData = responseData["body"];
        // @ts-ignore
        localStorage.setItem("GUARANTEE_DATA", JSON.stringify(this.guaranteeData));
        // @ts-ignore
        this.dataForm.code.setValue(this.guaranteeData.code);
        this.dataForm.name.setValue(this.guaranteeData.name);
        this.dataForm.taxRate.setValue(this.guaranteeData.taxRate);
        this.dataForm.franchiseRate.setValue(this.guaranteeData.franchiseRate);
        this.dataForm.franchiseMinimum.setValue(this.guaranteeData.franchiseMinimum);
        this.dataForm.franchiseMaximum.setValue(this.guaranteeData.franchiseMaximum);
        this.dataForm.subscriptionMinimumPeriod.setValue(this.guaranteeData.subscriptionMinimumPeriod);
        this.dataForm.subscriptionMaximumPeriod.setValue(this.guaranteeData.subscriptionMaximumPeriod);
        this.dataForm.deficiencyDeadline.setValue(this.guaranteeData.deficiencyDeadline);
        if (this.guaranteeData.deficiencyDeadlineUnit) {
          this.dataForm.deficiencyDeadlineUnit.setValue(this.guaranteeData.deficiencyDeadlineUnit.code);
        }
        this.dataForm.guaranteeFloor.setValue(this.guaranteeData.guaranteeFloor);
        this.dataForm.guaranteeCeiling.setValue(this.guaranteeData.guaranteeCeiling);
        this.dataForm.premiumMinimum.setValue(this.guaranteeData.premiumMinimum);
        // @ts-ignore
        this.dataForm.discountApplicable.setValue(""+this.guaranteeData.discountApplicable);
        if (this.guaranteeData.zone) {
          this.dataForm.zone.setValue(this.guaranteeData.zone.id);
        }
        if (this.guaranteeData.partners) {
          if (this.guaranteeData.partners.length > 0) {
            let partnerIds: any[] = [];
            this.guaranteeData.partners.forEach((p: any) => {
              partnerIds.push(p.id);
            });
            // @ts-ignore
            this.dataForm.partners.setValue(partnerIds);
          }
        }
        this.dataForm.description.setValue(this.guaranteeData.description);
        // @ts-ignore
        this.dataForm.enabled.setValue(""+this.guaranteeData.enabled);
        this.dataForm.clauses.setValue(this.guaranteeData.clauses);
        this.guaranteeClauses = this.guaranteeData.clauses;
        this.closeDialog();
        this.onSaveNotificationDialog();
      }, (errorData: HttpErrorResponse) => {
        this.isSave = false;
        console.log(errorData);
        this.closeDialog();
        this.onSaveErrorNotificationDialog(errorData);
      });

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
        dialogMessage: "La modification de la garantie a réussi."
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

    });

  }

  onSaveErrorNotificationDialog(error: HttpErrorResponse): void {

    const dialogRef = this._dialog.open(SaveErrorNotificationDialogComponent, {
      hasBackdrop: false,
      width: '440px',
      data: {
        httpError: error,
        dialogMessage: "La modification de la garantie a échoué."
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
      width: '370px',
      height: '200px',
      data: {
        dialogMessage: "de cette garantie"
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if (result) {
       // this.onSave();
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

  openClauseEditorDialog() {
    const dialogRef = this._dialog.open(GuaranteeClauseEditorDialogComponent, {
      hasBackdrop: false,
      data: {guaranteeClauses: this.guaranteeData.clauses, isView: true},
      width: '900px',
      height: '900'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onGoToEdit() {
    this.loadingPage = true;

    this._router.navigateByUrl("/account/guarantees/edit")
      .then(() => {
        // @ts-ignore
        localStorage.setItem("GUARANTEE_DATA", JSON.stringify(this.guaranteeData));
        this.loadingPage = false;
      });

  }

  protected readonly environment = environment;
}
