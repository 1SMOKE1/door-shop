import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavService } from 'src/app/share/nav.service';
import { ShowCertificateComponent } from './show-certificate/show-certificate.component';

@Component({
  selector: 'dsa-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent implements OnInit {
  private window: Window | null;
  constructor(
    private dialog: MatDialog,
    @Inject(DOCUMENT) docRef: Document,
    private navService: NavService
     ) {
      this.window = docRef.defaultView
     }

  ngOnInit(): void {
    this.window?.scrollTo(0,0);
  }

  public showImg(e: Event): void{
    let cur = e.target as HTMLImageElement;
    let img = cur.src;
    console.log(img)
    let dialogRef = this.dialog.open(ShowCertificateComponent, {
      data: img
    })
    dialogRef.updateSize('600px');
    
  }

  emitScrollAction(): void{
    this.navService.scrollToConsultationAnim();
  }


}
