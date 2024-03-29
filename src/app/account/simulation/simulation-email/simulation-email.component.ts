import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-simulation-email',
  standalone: true,
  imports: [],
  templateUrl: './simulation-email.component.html',
  styleUrl: './simulation-email.component.css'
})
export class SimulationEmailComponent implements OnInit, AfterViewInit, OnDestroy{

  @Input() field: any = null;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

}
