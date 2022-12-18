import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { carouselImageI } from 'src/app/interfaces/carouselImageI';

@Component({
  selector: 'dsa-owl-carousel',
  templateUrl: './owl-carousel.component.html',
  styleUrls: ['./owl-carousel.component.scss']
})
export class OwlCarouselComponent implements OnInit, AfterViewInit {
  @Input('images') public images$!: Observable<any>;
  constructor() { }
  images: carouselImageI[] = [];
  ngOnInit(): void {
  }
  
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: 3
      }
    }
  }

  private getImages(): void{
    this.images$?.subscribe((res: carouselImageI[]) => this.images = res);
  }

  ngAfterViewInit(): void {
    this.getImages();
  }
}
