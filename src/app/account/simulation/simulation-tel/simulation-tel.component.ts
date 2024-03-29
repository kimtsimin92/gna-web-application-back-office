import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-simulation-tel',
  standalone: true,
  imports: [],
  templateUrl: './simulation-tel.component.html',
  styleUrl: './simulation-tel.component.css'
})
export class SimulationTelComponent implements OnInit, AfterViewInit, OnDestroy{

  @Input() field: any = null;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

}
