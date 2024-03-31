import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PaginatorModule} from "primeng/paginator";

@Component({
  selector: 'app-simulation-tel',
  standalone: true,
    imports: [
        PaginatorModule
    ],
  templateUrl: './simulation-tel.component.html',
  styleUrl: './simulation-tel.component.css'
})
export class SimulationTelComponent implements OnInit, AfterViewInit, OnDestroy {

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
