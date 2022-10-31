import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject} from '@angular/core';

@Component({
  selector: 'dsa-door-measurement',
  templateUrl: './door-measurement.component.html',
  styleUrls: ['./door-measurement.component.scss']
})
export class DoorMeasurementComponent implements OnInit {
  private window: Window | null
  constructor(
    @Inject(DOCUMENT) docRef: Document
  ) {
    this.window = docRef.defaultView;
   }

  ngOnInit(): void {
    this.window?.scrollTo(0,0)
  }

}
