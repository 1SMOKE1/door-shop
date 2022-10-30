import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'dsa-show-certificate',
  templateUrl: './show-certificate.component.html',
  styleUrls: ['./show-certificate.component.scss']
})
export class ShowCertificateComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string,
  private dialogRef: MatDialogRef<ShowCertificateComponent>) { }

  ngOnInit(): void {
  }

  public close():void{
    this.dialogRef.close();
  }

}
