import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PaginatorModule} from "primeng/paginator";

@Component({
  selector: 'app-simulation-textarea',
  standalone: true,
    imports: [
        PaginatorModule
    ],
  templateUrl: './simulation-textarea.component.html',
  styleUrl: './simulation-textarea.component.css'
})
export class SimulationTextareaComponent implements OnInit, AfterViewInit, OnDestroy {

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
