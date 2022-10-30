import { DOCUMENT } from '@angular/common';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Inject, Renderer2, DoCheck, Input} from '@angular/core';
import { interval, Observable } from 'rxjs';
import { carouselImageI } from 'src/app/interfaces/carouselImageI';
import { DataBaseService } from '../data-base.service';








@Component({
  selector: 'dsa-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})

export class CarouselComponent implements OnInit, AfterViewInit, DoCheck{
  @Input('images') images$: Observable<carouselImageI[]> | undefined;

  @ViewChild('carouselLine', {static: false}) carouselLine: ElementRef | undefined;
  @ViewChild('carouselWrap', {static: false}) carouselWrap: ElementRef | undefined;
  images: carouselImageI[] = [];
  window: Window | null;
  setsWidth: number = 0;
  countOfSets: number = 0;
  counter: number = 0;
  autoMoveOn: boolean = true;

  constructor(
    private dataBaseService: DataBaseService,
    @Inject(DOCUMENT) private docRef: Document,
    public renderer: Renderer2,
    ){
      this.window = docRef.defaultView;
    }  

  ngOnInit(): void {
    this.autoMove()
    .subscribe(() =>{
      this.moveRight()
    });
  }

  private getWorkImages(): void{
    this.images$?.
      subscribe((images: carouselImageI[]) => {
        this.images = images;
        console.log(this.images);
        this.countOfSets = 
        this.images.length % 3 === 0 
        ? this.images.length / 3
        : Math.ceil(this.images.length / 3);
      })
  }

  public moveRight(): void{
    this.counter++;
    if(this.counter >= this.countOfSets){
      this.counter = 0;
    }
    const carouselLine = this.carouselLine?.nativeElement as HTMLElement;
    carouselLine.style.transform = 'translate(-' + this.counter * this.setsWidth + 'px)';
    this.autoMoveOn = false;
  }

  public moveLeft(): void{
    this.counter--;
    if(this.counter <= 0){
      this.counter = 0;
    }
    const carouselLine = this.carouselLine?.nativeElement as HTMLElement;
    carouselLine.style.transform = 'translate(-' + this.counter * this.setsWidth + 'px)';
  }

  
  ngAfterViewInit(): void {
    this.getWorkImages();
    const adaptiveFn = (): void => {
      const carouselWrap = this.carouselWrap?.nativeElement as HTMLElement;
      this.setsWidth = carouselWrap.offsetWidth;
      const carouselLine = this.carouselLine?.nativeElement as HTMLElement;
      carouselLine.style.width = this.setsWidth * this.countOfSets + 'px';
      for(const child of carouselLine.children as any){
        child.style.width = this.setsWidth / 3 + 'px';
        child.style.height = 'auto';
      }
    }
    this.window?.addEventListener('resize', adaptiveFn);
    adaptiveFn();
    
    
  }
  

  ngDoCheck(): void {
    this.adaptiveTableMobile(400);
    this.adaptiveTableMobile(1000);
  }
  
  
  private adaptiveTableMobile(screenW: number){
    if(this.window!.innerWidth <= screenW){
      if(this.carouselWrap){
        const carouselWrap = this.carouselWrap?.nativeElement as HTMLElement;
        this.setsWidth = carouselWrap.offsetWidth;
      }
      if(this.carouselLine){
        const carouselLine = this.carouselLine?.nativeElement as HTMLElement;
        carouselLine.style.width = this.setsWidth * this.countOfSets + 'px'
        for(const child of carouselLine.children as any){
          child.style.width = this.setsWidth / 3 + 'px';
          child.style.height = 'auto';
        }
      }
    }
  }

  private autoMove(): Observable<any>{
    return interval(5000);
  }
}
