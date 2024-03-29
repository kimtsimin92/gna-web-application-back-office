import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-simulation-number',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './simulation-number.component.html',
  styleUrl: './simulation-number.component.css'
})
export class SimulationNumberComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() field: any = null;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.field);
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

}
