import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavService } from 'src/app/share/nav.service';

@Component({
  selector: 'dsa-door-installation',
  templateUrl: './door-installation.component.html',
  styleUrls: ['./door-installation.component.scss']
})
export class DoorInstallationComponent implements OnInit {
  private window: Window | null;
  constructor(
    @Inject(DOCUMENT) docRef: Document,
    private navService: NavService
  ) {this.window = docRef.defaultView }

  ngOnInit(): void {
    this.window?.scrollTo(0,0);
  }

  emitScrollAction(): void{
    this.navService.scrollToConsultationAnim();
  }



}
