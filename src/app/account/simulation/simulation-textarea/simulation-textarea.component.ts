import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-simulation-textarea',
  standalone: true,
  imports: [],
  templateUrl: './simulation-textarea.component.html',
  styleUrl: './simulation-textarea.component.css'
})
export class SimulationTextareaComponent implements OnInit, AfterViewInit, OnDestroy{

  @Input() field: any = null;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

}
