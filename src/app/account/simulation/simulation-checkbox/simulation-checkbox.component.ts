import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-simulation-checkbox',
  standalone: true,
  imports: [],
  templateUrl: './simulation-checkbox.component.html',
  styleUrl: './simulation-checkbox.component.css'
})
export class SimulationCheckboxComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() field: any = null;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.field);

    if (this.field.attributes && this.field.attributes.options && this.field.attributes.values) {

      let optionElements = this.field.attributes.options;

      let valueElements = this.field.attributes.values;

      if (Array.isArray(optionElements) && Array.isArray(valueElements)) {

        if (optionElements && optionElements.length > 0 && valueElements && valueElements.length > 0) {
          this.field.attributes.ots = [];
          optionElements.forEach((oe: any) => {
            this.field.attributes.ots.push(oe);
          });
          this.field.attributes.vs = [];
          valueElements.forEach((ve: any) => {
            this.field.attributes.vs.push(ve);
          });
        }


      } else {
        let optionElements = this.field.attributes.options.split("\n");
        let valueElements = this.field.attributes.values.split("\n");

        if (optionElements && optionElements.length > 0 && valueElements && valueElements.length > 0) {
          this.field.attributes.ots = [];
          optionElements.forEach((oe: any) => {
            this.field.attributes.ots.push(oe);
          });
          this.field.attributes.vs = [];
          valueElements.forEach((ve: any) => {
            this.field.attributes.vs.push(ve);
          });
        }

      }


    }
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

  onActivateCheckbox(id: string) {
    let checkbox = document.getElementById(id);
    if (checkbox) {
      // @ts-ignore
      checkbox.checked = true;
      this.field.attributes.value = id;
    }
  }

}

