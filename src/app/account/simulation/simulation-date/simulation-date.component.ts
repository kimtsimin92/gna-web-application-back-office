import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-simulation-date',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './simulation-date.component.html',
  styleUrl: './simulation-date.component.css'
})
export class SimulationDateComponent implements OnInit, AfterViewInit, OnDestroy {

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
