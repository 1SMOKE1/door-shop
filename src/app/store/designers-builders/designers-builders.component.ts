import { Component, OnInit, Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'dsa-designers-builders',
  templateUrl: './designers-builders.component.html',
  styleUrls: ['./designers-builders.component.scss']
})
export class DesignersBuildersComponent implements OnInit {
  private window: Window | null;
  constructor(
    @Inject(DOCUMENT) docRef: Document
  ) {this.window = docRef.defaultView }

  ngOnInit(): void {
    this.window?.scrollTo(0,0);
  }

}
