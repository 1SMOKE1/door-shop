import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { mergeMap } from 'rxjs';
import { productProducerI } from 'src/app/interfaces/productProducer';
import { DataBaseService } from 'src/app/share/data-base.service';

@Component({
  selector: 'dsa-product-producer',
  templateUrl: './product-producer.component.html',
  styleUrls: ['./product-producer.component.scss']
})
export class ProductProducerComponent implements OnInit {
  productProducerForm: FormGroup = new FormGroup({
    'producerName': new FormControl(''),
    'filtrationField': new FormControl(''),
    '_id': new FormControl(null)
  });
  productProducers: productProducerI[] = [];
  constructor(
    private dataBaseService: DataBaseService,
  ) { }

  ngOnInit(): void {
    this.getProductProducers();
  }

  complete(): void{
    if(this.isEditMode()){
      this.update()
    } else {
      this.add()
    }
  }

  edit(productProducer: productProducerI): void{
    this.productProducerForm.patchValue(productProducer);
  }

  delete(id: string): void{
    this.dataBaseService
      .deleteProductProducer(id)
      .pipe(
        mergeMap(() => this.dataBaseService.getProductProducers())
      )
      .subscribe((res: productProducerI[]) => {
        this.productProducers = res;
      })
  }

  private add(): void{

    const productProducer: productProducerI = {
      producerName: this.productProducerForm.value.producerName,
      filtrationField: this.productProducerForm.value.filtrationField
    }

    this.dataBaseService
      .createProductProducer(productProducer)
      .pipe(
        mergeMap(() => this.dataBaseService.getProductProducers())
      )
      .subscribe((res: productProducerI[]) => {
        this.productProducers = res;
        this.productProducerForm.reset();
      })
      
  }

  update(): void{
    this.dataBaseService
      .updateProductProducer(this.productProducerForm.value)
      .pipe(
        mergeMap(() => this.dataBaseService.getProductProducers())
      )
      .subscribe((res: productProducerI[]) => {
        this.productProducers = res;
        this.productProducerForm.reset();
      })
  }

  private getProductProducers(): void{
    this.dataBaseService
      .getProductProducers()
      .subscribe((res: productProducerI[]) => {
        this.productProducers = res;
        console.log(res);
      });
  }

  isEditMode(): boolean{
    return !!this.productProducerForm.get('_id')?.value
  }
}
