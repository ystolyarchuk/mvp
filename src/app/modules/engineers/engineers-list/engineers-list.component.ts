import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-engineers-list',
  templateUrl: './engineers-list.component.html',
  styleUrls: ['./engineers-list.component.scss'],
})
export class EngineersListComponent implements OnInit {
  @Input() engineers;
  @Input() orderId;

  constructor() {}

  ngOnInit(): void {}
}
