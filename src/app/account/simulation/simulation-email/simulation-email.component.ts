import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PaginatorModule} from "primeng/paginator";

@Component({
  selector: 'app-simulation-email',
  standalone: true,
  imports: [
    PaginatorModule
  ],
  templateUrl: './simulation-email.component.html',
  styleUrl: './simulation-email.component.css'
})
export class SimulationEmailComponent implements OnInit, AfterViewInit, OnDestroy {

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
