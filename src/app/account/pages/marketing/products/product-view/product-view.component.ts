import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {CheckboxModule} from "primeng/checkbox";
import {CurrencyPipe, DatePipe, DecimalPipe, KeyValuePipe, NgIf} from "@angular/common";
import {DropdownModule} from "primeng/dropdown";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ImageModule} from "primeng/image";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {KeyFilterModule} from "primeng/keyfilter";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MultiSelectModule} from "primeng/multiselect";
import {MenuItem, SharedModule} from "primeng/api";
import {ProductForm} from "../product-form";
import {ProductPartnerForm} from "../product-partner-form";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AccountService} from "../../../../account.service";
import {
  ConfirmationEditDialogComponent
} from "../../../../dialogs/confirmation/confirmation-edit-dialog/confirmation-edit-dialog.component";
import {
  SaveLoadingDialogComponent
} from "../../../../dialogs/loading/save-loading-dialog/save-loading-dialog.component";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {
  SaveNotificationDialogComponent
} from "../../../../dialogs/notification/save-notification-dialog/save-notification-dialog.component";
import {
  SaveErrorNotificationDialogComponent
} from "../../../../dialogs/notification/save-error-notification-dialog/save-error-notification-dialog.component";
import {NotBlankDialogComponent} from "../../../../dialogs/not-blank-dialog/not-blank-dialog.component";
import {
  GuaranteeClauseEditorDialogComponent
} from "../../../settings-products/guarantees/guarantee-clause-editor-dialog/guarantee-clause-editor-dialog.component";
import {TagModule} from "primeng/tag";

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [
    CheckboxModule,
    DecimalPipe,
    DropdownModule,
    FormsModule,
    ImageModule,
    InputTextModule,
    InputTextareaModule,
    KeyFilterModule,
    KeyValuePipe,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MultiSelectModule,
    NgIf,
    ReactiveFormsModule,
    SharedModule,
    CurrencyPipe,
    DatePipe,
    TagModule
  ],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent implements OnInit, OnDestroy, AfterViewInit {

  headerTitle: string | undefined;

  formData: FormGroup = new FormGroup({}, undefined, undefined);
  dataForm: ProductForm = new ProductForm();

  formProductPartner: FormGroup = new FormGroup({}, undefined, undefined);
  productPartnerForm: ProductPartnerForm = new ProductPartnerForm();

  isSave: boolean = false;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  loadingPage: boolean = false;


  productGroupList: any[] = [];
  segmentList: any[] = [];


  productClauses: any;

  isDisable: boolean = true;
  isReadonly: boolean = true;

  partnerList: any[] = [];
  // @ts-ignore
  partnerId: number = null;

  yesOrNoList1: any[] = [];
  yesOrNoList2: any[] = [];
  yesOrNoList3: any[] = [];

  selectPartnerList: any[] = [];
  branchCode: any = null;
  guaranteeCode: any = null;

  incentiveList: any[] = [];

  // @ts-ignore
  productImageFile: File = null;

  productImageUrl: any = null;
  productAdvertisementObjectFileUrl: any = null;
  // @ts-ignore
  advertisementObjectFile: File = null;
  productData: any = null;

  // @ts-ignore
  imageErrorMessage: string = null;

  // @ts-ignore
  objectFileErrorMessage: string = null;

  constructor(
    private _fb: FormBuilder,
    public _dialog: MatDialog,
    private _router: Router,
    public accountService: AccountService) {

  }

  ngOnInit(): void {

    if (localStorage.getItem("PRODUCT_DATA")) {

      if (localStorage.getItem("APP_HEADER_TITLE")) {
        localStorage.removeItem("APP_HEADER_TITLE");
      }

      this.headerTitle = "Marketing";
      localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);

      // @ts-ignore
      this.productData = JSON.parse(localStorage.getItem("PRODUCT_DATA"));

      this.productClauses = this.productData.clauses;

      if (this.productData.group) {
        this.productGroupList.push(this.productData.group.name);
      }

      if (this.productData.segment) {
        this.segmentList.push(this.productData.segment.name);
      }

      if (this.productData.renewable) {
        this.yesOrNoList1.push("Oui");
      } else {
        this.yesOrNoList1.push("Non");
      }

      if (this.productData.tacitAgreement) {
        this.yesOrNoList2.push("Oui");
      } else {
        this.yesOrNoList2.push("Non");
      }

      if (this.productData.advertisementObject) {
        this.yesOrNoList3.push("Oui");
      } else {
        this.yesOrNoList3.push("Non");
      }


      if (this.productData.incentives) {
        if (this.productData.incentives.length > 0) {
          let incentiveIds: any[] = [];
          this.productData.incentives.forEach((i: any) => {
            incentiveIds.push(i.name);
          });
          // @ts-ignore
          this.dataForm.incentives.setValue(incentiveIds);
        }
      }

      if (this.productData.partnerSubscriptions) {
        if (this.productData.partnerSubscriptions.length > 0) {
          this.productData.partnerSubscriptions.forEach((ps: any) => {
            let partner = {
              partnerId: ps.partner.id,
              code: ps.partner.code,
              name: ps.partner.name,
              accessoryAmount: ps.accessoryAmount,
              commissionRate: ps.commissionRate,
              sponsorshipCode: ps.sponsorshipCode,
            }
            this.selectPartnerList[partner.partnerId] = partner;
          });
        }
      }

      if (this.productData.image) {
        this.productImageUrl = this.productData.image.url;
      }

      if (this.productData.advertisementObjectFile) {
        this.productAdvertisementObjectFileUrl = this.productData.advertisementObjectFile.url;
      }


    } else {
      this._router.navigateByUrl("account/marketing/products/list");
    }

  }

  ngAfterViewInit(): void {
    this.getProductImageFile();
    this.getAdvertisementObjectFile();
  }

  ngOnDestroy(): void {

    this.productClauses = null;

  }

  onBack() {
    this._router.navigateByUrl("account/marketing/products/list");
  }

  onConfirm(): void {

    this.isSave = true;
    this.accountService.isSave = this.isSave;

    const dialogRef = this._dialog.open(ConfirmationEditDialogComponent, {
      hasBackdrop: false,
      width: '405px',
      height: '340px',
      data: {
        dialogMessage: "de ce produit"
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

  onSaveLoadingDialog(): void {

    const dialogRef = this._dialog.open(SaveLoadingDialogComponent, {
      hasBackdrop: false,
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  private onSave() {

    this.isSave = true;
    console.log(this.formData.value);

    this.onSaveLoadingDialog();

    let requestData = {
      name: this.formData.value.name,
      description: this.formData.value.description,
      groupId: null,
      segmentId: null,
      crossSellingProductCode: this.formData.value.crossSellingProductCode,
      crossSellingDiscountRate: this.formData.value.crossSellingDiscountRate,
      incentives: [],
      cashBackRate: this.formData.value.cashBackRate,
      commercialDiscountRate: this.formData.value.commercialDiscountRate,
      premiumIncreaseRate: this.formData.value.premiumIncreaseRate,
      loyaltyPoint: this.formData.value.loyaltyPoint,
      renewable: null,
      tacitAgreement: null,
      advertisementObject: null,
      advertisementObjectFile: null,
      backOfficeValidation: this.formData.value.backOfficeValidation,
      clauses: this.productClauses,
      partners: [],
    }

    if (this.formData.value.group) {
      if (this.productGroupList && this.productGroupList.length > 0) {
        this.productGroupList.forEach((g: any) => {
          if (g.name === this.formData.value.group) {
            requestData.groupId = g.id;
          }
        });
      }
    }

    if (this.formData.value.segment) {
      if (this.segmentList && this.segmentList.length > 0) {
        this.segmentList.forEach((item: any) => {
          if (item.name === this.formData.value.segment) {
            requestData.segmentId = item.id;
          }
        });
      }
    }

    if (this.formData.value.renewable) {
      if (this.formData.value.renewable === 'Oui') {
        // @ts-ignore
        requestData.renewable = true;
      } else if (this.formData.value.renewable === 'Non') {
        // @ts-ignore
        requestData.renewable = false;
      }
    }

    if (this.formData.value.tacitAgreement) {
      if (this.formData.value.tacitAgreement === 'Oui') {
        // @ts-ignore
        requestData.tacitAgreement = true;
      } else if (this.formData.value.tacitAgreement === 'Non') {
        // @ts-ignore
        requestData.tacitAgreement = false;
      }
    }

    if (this.formData.value.advertisementObject && this.productAdvertisementObjectFileUrl
      || this.formData.value.advertisementObject && this.advertisementObjectFile) {
      if (this.formData.value.advertisementObject === 'Oui') {
        // @ts-ignore
        requestData.advertisementObject = true;
      } else if (this.formData.value.advertisementObject === 'Non') {
        // @ts-ignore
        requestData.advertisementObject = false;
      }
    }

    if (this.selectPartnerList && this.selectPartnerList.length > 0) {
      // @ts-ignore
      this.dataForm.partners.setValue(new FormControl(this.selectPartnerList));
    }

    if (this.formData.value.incentives) {
      let incentives = this.formData.value.incentives;
      if (incentives.length > 0) {
        incentives.forEach((incentive: any) => {
          // @ts-ignore
          requestData.incentives.push(incentive.id);
        });
      }
    }

    if (this.selectPartnerList && this.selectPartnerList.length > 0) {
      // @ts-ignore
      requestData.partners = this.selectPartnerList;
    }

    let id = this.productData.id;

    console.log(requestData);

    this.accountService.editProduct(id, requestData)
      .subscribe((responseData: HttpResponse<any>) => {

        console.log(responseData);
        this.productData = responseData["body"];

        if (this.productData) {

          let productId = this.productData.id;

          if (this.productImageFile) {
            let requestProductImage = new FormData();
            requestProductImage.append("file", this.productImageFile);
            this.onSaveProductImage(productId, requestProductImage);
          } else if (this.productData.advertisementObject && this.advertisementObjectFile) {
            let requestProductAdvertisementObjectFile = new FormData();
            requestProductAdvertisementObjectFile.append("file", this.advertisementObjectFile);
            this.onSaveProductAdvertisementObjectFile(productId, requestProductAdvertisementObjectFile);
          } else {
            this.isSave = false;
            this.closeDialog();
            this.onSaveNotificationDialog();
          }

        } else {
          this.isSave = false;
          this.closeDialog();
          this.onSaveNotificationDialog();
        }

      }, (errorData: HttpErrorResponse) => {
        this.isSave = false;
        console.log(errorData);
        this.closeDialog();
        this.onSaveErrorNotificationDialog(errorData);
      });

  }

  private onSaveProductAdvertisementObjectFile(productId: number, requestData: FormData) {

    this.isSave = true;

    this.accountService.onSaveProductAdvertisementObjectFile(productId, requestData)
      .subscribe((responseData: HttpResponse<any>) => {
        this.isSave = false;
        console.log(responseData);
        this.closeDialog();
        this.onSaveNotificationDialog();
      }, (errorData: HttpErrorResponse) => {
        this.isSave = false;
        console.log(errorData);
        this.closeDialog();
        this.onSaveErrorNotificationDialog(errorData);
      });

  }

  private onSaveProductImage(productId: number, requestData: FormData) {

    this.isSave = true;

    this.accountService.saveProductImage(productId, requestData)
      .subscribe((responseData: HttpResponse<any>) => {
        console.log(responseData);

        if (this.productData.advertisementObject && this.advertisementObjectFile) {
          let requestProductAdvertisementObjectFile = new FormData();
          requestProductAdvertisementObjectFile.append("file", this.advertisementObjectFile);
          this.onSaveProductAdvertisementObjectFile(productId, requestProductAdvertisementObjectFile);
        } else {
          this.isSave = false;
          this.closeDialog();
          this.onSaveNotificationDialog();
        }


      }, (errorData: HttpErrorResponse) => {
        this.isSave = false;
        console.log(errorData);
        this.closeDialog();
        this.onSaveErrorNotificationDialog(errorData);
      });

  }

  onSaveNotificationDialog(): void {

    const dialogRef = this._dialog.open(SaveNotificationDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      height: '350px',
      data: {
        dialogMessage: "La modification de ce produit a réussi."
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

      this._router.navigateByUrl("account/marketing/products/list")
        .then(() => {
          this.loadingPage = false;
        });

    });

  }

  onSaveErrorNotificationDialog(error: HttpErrorResponse): void {

    const dialogRef = this._dialog.open(SaveErrorNotificationDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      height: '350px',
      data: {
        httpError: error,
        dialogMessage: "La modification de ce produit a échoué."
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


  onGetNotBlankAlert() {
    // Trigger validation by marking all controls as touched
    this.formData.markAllAsTouched();
    const dialogRef = this._dialog.open(NotBlankDialogComponent, {
      width: '400px',
      height: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  onGetProductGroupList() {
    this.accountService.pageLoading = true;
    this.accountService.getProductGroupList()
      .subscribe((responseData: HttpResponse<any>) => {
        this.accountService.pageLoading = false;
        console.log(responseData);
        this.productGroupList = responseData["body"];
      }, (errorData: HttpErrorResponse) => {
        this.accountService.pageLoading = false;
        console.log(errorData);
      });
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

  onGetIncentiveList() {
    this.accountService.pageLoading = true;
    this.accountService.getIncentiveList()
      .subscribe((responseData: HttpResponse<any>) => {
        this.accountService.pageLoading = false;
        console.log(responseData);
        this.incentiveList = responseData["body"];
      }, (errorData: HttpErrorResponse) => {
        this.accountService.pageLoading = false;
        console.log(errorData);
      });
  }


  /*  onSelectGuarantee(guarantee: any) {
      if (this.selectPartnerList[guarantee.id]) {
        delete this.selectPartnerList[guarantee.id];
      } else {
        this.selectPartnerList[guarantee.id] = guarantee;
        this.guaranteeCode = guarantee.code;
      }
    } */

  onAddPartnerToTable() {
    console.log(this.formProductPartner.value);

    if (this.formProductPartner.value && this.formProductPartner.value.partnerId) {

      if (this.partnerList && this.partnerList.length > 0) {
        this.partnerList.forEach((p: any) => {
          if (p.name === this.formProductPartner.value.partnerId) {

            let partner = {
              partnerId: p.id,
              code: p.code,
              name: p.name,
              accessoryAmount: this.formProductPartner.value.partnerAccessoryAmount,
              commissionRate: this.formProductPartner.value.partnerCommissionRate,
              sponsorshipCode: this.formProductPartner.value.sponsorshipCode,
            };

            console.log(partner);

            this.selectPartnerList[partner.partnerId] = partner;
            this.productPartnerForm = new ProductPartnerForm();
            this.formProductPartner = this._fb.group(this.productPartnerForm);

          }
        });
      }

    }


  }

  onEditItem(item: any) {
    this.productPartnerForm.partnerId.setValue(item.name);
    this.productPartnerForm.partnerAccessoryAmount.setValue(item.accessoryAmount);
    this.productPartnerForm.partnerCommissionRate.setValue(item.commissionRate);
    this.productPartnerForm.sponsorshipCode.setValue(item.sponsorshipCode);
  }

  onSelectGuarantee(guarantee: any) {
    console.log(guarantee);
    this.guaranteeCode = guarantee;
  }

  onRemoveGuaranteeFromList(item: any) {
    if (this.selectPartnerList[item.partnerId]) {
      delete this.selectPartnerList[item.partnerId];
    }
  }

  openClauseEditorDialog() {
    const dialogRef = this._dialog.open(GuaranteeClauseEditorDialogComponent, {
      hasBackdrop: false,
      data: {clauses: this.productClauses, isView: true},
      width: '900px',
      height: '900'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result && result.length > 0) {
        this.productClauses = result;
      }
    });
  }

  onGetPartnerCommercialList() {
    this.accountService.pageLoading = true;
    this.accountService.getPartnerCommercialList()
      .subscribe((responseData: HttpResponse<any>) => {
        this.accountService.pageLoading = false;
        console.log(responseData);
        this.partnerList = responseData["body"];
      }, (errorData: HttpErrorResponse) => {
        this.accountService.pageLoading = false;
        console.log(errorData);
      });
  }

  getProductImageFile() {

    // @ts-ignore
    this.imageErrorMessage = null;

    const input = document.getElementById('productImageFile')

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
          this.productImageFile = null;
          this.productImageUrl = null;
          this.imageErrorMessage = "jpg, jpeg ou png type *"
          return false;
        }

        if (file.size > maxSize) {
          // @ts-ignore
          input.value = null;
          // @ts-ignore
          this.productImageFile = null;
          this.productImageUrl = null;
          this.imageErrorMessage = "2 Mo taille maximum *"
          return false;
        }

        this.productImageFile = file;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
          this.productImageUrl = reader.result;
        }

        // @ts-ignore
        this.imageErrorMessage = null;

      } else {
        // @ts-ignore
        input.value = null;
        // @ts-ignore
        this.productImageFile = null;
        this.productImageUrl = null;
        // @ts-ignore
        this.imageErrorMessage = null;
      }

    });
  }

  getAdvertisementObjectFile() {

    // @ts-ignore
    this.objectFileErrorMessage = null;

    const input = document.getElementById('advertisementObjectFile')

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
        let maxSize = 5 * 1024 * 1024; // 5 Mo en octets

        const allowedExtensions = ['application/pdf'];

        if (!allowedExtensions.includes(mimeType)) {
          // @ts-ignore
          input.value = null;
          // @ts-ignore
          this.advertisementObjectFile = null;
          this.objectFileErrorMessage = "pdf type  *"
          return false;
        }

        if (file.size > maxSize) {
          // @ts-ignore
          input.value = null;
          // @ts-ignore
          this.advertisementObjectFile = null;
          this.objectFileErrorMessage = "5 Mo taille maximum *"
          return false;
        }

        this.advertisementObjectFile = file;
        // @ts-ignore
        this.objectFileErrorMessage = null;

      } else {
        // @ts-ignore
        input.value = null;
        // @ts-ignore
        this.productImageFile = null;
        this.productImageUrl = null;
        // @ts-ignore
        this.objectFileErrorMessage = null;
      }

    });
  }

  onViewEdit() {
    this.loadingPage = true;

    // @ts-ignore
    localStorage.setItem("PRODUCT_DATA", JSON.stringify(this.productData));

    this._router.navigateByUrl("account/marketing/products/edit")
      .then(() => {
        this.loadingPage = false;
      });
  }
}
