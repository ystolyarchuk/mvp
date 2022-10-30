import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-engineer',
  templateUrl: './order-engineer.component.html',
  styleUrls: ['./order-engineer.component.scss']
})
export class OrderEngineerComponent implements OnInit {
  @Input() engineer;
  constructor() { }

  ngOnInit(): void {
  }

}
