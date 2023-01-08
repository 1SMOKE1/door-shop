import { Component, OnInit} from '@angular/core';
import { NavService } from 'src/app/share/nav.service';

@Component({
  selector: 'dsa-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  constructor(
    private navService: NavService

  ) {
   }

  ngOnInit(): void {
  }

  emitScrollAction(): void{
    this.navService.scrollToConsultationAnim();
  }

}
