import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {SimulationCheckboxComponent} from "../simulation-checkbox/simulation-checkbox.component";
import {SimulationDateComponent} from "../simulation-date/simulation-date.component";
import {SimulationEmailComponent} from "../simulation-email/simulation-email.component";
import {SimulationNumberComponent} from "../simulation-number/simulation-number.component";
import {SimulationRadioComponent} from "../simulation-radio/simulation-radio.component";
import {SimulationSelectComponent} from "../simulation-select/simulation-select.component";
import {SimulationTelComponent} from "../simulation-tel/simulation-tel.component";
import {SimulationTextComponent} from "../simulation-text/simulation-text.component";
import {SimulationTextareaComponent} from "../simulation-textarea/simulation-textarea.component";
import {Router} from "@angular/router";
import {SimulationService} from "../simulation.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {DecimalPipe} from "@angular/common";
import {SaveLoadingDialogComponent} from "../../dialogs/loading/save-loading-dialog/save-loading-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {
  SimulationQuotationLoadingDialogComponent
} from "../simulation-quotation-loading-dialog/simulation-quotation-loading-dialog.component";

@Component({
  selector: 'app-simulation-quotation',
  standalone: true,
  imports: [
    SimulationCheckboxComponent,
    SimulationDateComponent,
    SimulationEmailComponent,
    SimulationNumberComponent,
    SimulationRadioComponent,
    SimulationSelectComponent,
    SimulationTelComponent,
    SimulationTextComponent,
    SimulationTextareaComponent,
    DecimalPipe
  ],
  templateUrl: './simulation-quotation.component.html',
  styleUrl: './simulation-quotation.component.css'
})
export class SimulationQuotationComponent implements OnInit, AfterViewInit, OnDestroy {

  simulationRequestData: any = null;
  simulationData: any = null;
  guaranteeList: any[] = [];
  guaranteeMandatoryList: any[] = [];
  guaranteeComplementaryList: any[] = [];

  guaranteeMonth: number = 1;

  constructor(private _router: Router,
              public _dialog: MatDialog,
              private simulationService: SimulationService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem("SIMULATION_REQUEST_DATA")) {
      // @ts-ignore
      this.simulationRequestData = JSON.parse(localStorage.getItem("SIMULATION_REQUEST_DATA"));
      if (this.simulationRequestData) {
        this.onGetQuotation();
      }
    } else {
      this._router.navigateByUrl("/account/simulation/quotation");
    }
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    if (localStorage.getItem("SIMULATION_REQUEST_DATA")) {
      localStorage.removeItem("SIMULATION_REQUEST_DATA");
    }
  }

  onGetQuotation() {
    this.onLoadingDialog();
    this.simulationService.onGetQuotation(this.simulationRequestData)
      .subscribe((response: HttpResponse<any>) => {
        this.closeDialog();
        console.log(response);
        this.simulationData = response["body"];
        this.guaranteeList = [];
        this.guaranteeMandatoryList = [];
        this.guaranteeComplementaryList = [];
        if (this.simulationData && this.simulationData.guarantees) {
          this.guaranteeList = this.simulationData.guarantees;
          if (this.guaranteeList && this.guaranteeList.length > 0) {
            this.guaranteeList.forEach((gl: any) => {
              gl.checked = true;
              if (gl.mandatory) {
                this.guaranteeMandatoryList.push(gl);
              } else {
                this.guaranteeComplementaryList.push(gl);
              }
            })
          }
        }
      }, (error: HttpErrorResponse) => {
        this.closeDialog();
        console.error(error);
      });
  }

  onGetPremium() {

    let premiumAmount = 0;
    let mandatoryAmount = 0;
    let complementaryAmount = 0;

    if (this.guaranteeMandatoryList && this.guaranteeMandatoryList.length > 0) {
      this.guaranteeMandatoryList.forEach((gm: any) => {
        mandatoryAmount += gm.premium;
      })
    }

    if (this.guaranteeComplementaryList && this.guaranteeComplementaryList.length > 0) {
      this.guaranteeComplementaryList.forEach((gc: any) => {
        if (gc.checked) {
          complementaryAmount += gc.premium;
        }
      })
    }

    premiumAmount = mandatoryAmount + complementaryAmount;

    return premiumAmount * this.guaranteeMonth;

  }

  onCheckPremium(guarantee: any) {

    guarantee.checked = !guarantee.checked;

    let premiumAmount = 0;
    let mandatoryAmount = 0;
    let complementaryAmount = 0;

    if (this.guaranteeMandatoryList && this.guaranteeMandatoryList.length > 0) {
      this.guaranteeMandatoryList.forEach((gm: any) => {
        mandatoryAmount += gm.premium;
      })
    }

    if (this.guaranteeComplementaryList && this.guaranteeComplementaryList.length > 0) {
      this.guaranteeComplementaryList.forEach((gc: any) => {
        if (gc.checked) {
          complementaryAmount += gc.premium;
        }
      })
    }

    premiumAmount = mandatoryAmount + complementaryAmount;

    return premiumAmount * this.guaranteeMonth;

  }

  onActivateCheckbox(id: string) {
    let checkbox = document.getElementById(id);
    if (checkbox) {
      // @ts-ignore
      checkbox.checked = true;
    }

    this.guaranteeMonth = Number(id);

    this.onGetPremium();

  }

  onLoadingDialog(): void {

    const dialogRef = this._dialog.open(SimulationQuotationLoadingDialogComponent, {
      hasBackdrop: false,
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  closeDialog() {
    this._dialog.closeAll();
  }

}
