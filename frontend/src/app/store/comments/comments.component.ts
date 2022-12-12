import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { carouselImageI } from 'src/app/interfaces/carouselImageI';
import { DataBaseService } from 'src/app/share/data-base.service';
import { NavService } from 'src/app/share/nav.service';


@Component({
  selector: 'dsa-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  window: Window | null;
  imagesOurWorks$: Observable<carouselImageI[]>;
  imagesOurComments$: Observable<carouselImageI[]>;
  constructor(
    private dataBaseService: DataBaseService,
    @Inject(DOCUMENT) docRef: Document,
    private navService:  NavService
    ) {
    this.imagesOurWorks$ = dataBaseService.getOurWorks();
    this.imagesOurComments$ = dataBaseService.getOurComments();
    this.window = docRef.defaultView
  }

  ngOnInit(): void {
    this.window?.scrollTo(0,0)
  }

  emitScrollAction(): void{
    this.navService.animationScrollToConsultation();
  }


}
