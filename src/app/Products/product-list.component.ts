import { Component } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component ({

    selector: "pm-products",
    templateUrl:"./product-list.component.html"
})


export class ProductListComponent {
    Pagetitle:string = "My Kool Products";
    imageWidth : number = 50;
    imageMargin : number = 4;
    showImage: boolean = true;


    filterProducts: IProduct[];
    


  products: IProduct[]=  [];
  constructor(private productService: ProductService){
    console.log("in th constructor")
    //this.products = productService.getProducts();
    
   
  }

  ngOnInit(): void{
    console.log("in the onInit Lifecycle")

    this.productService.getProducts().subscribe({
      next: prodObserved => {this.products = prodObserved;
      this.filterProducts = this.products;
      }
    })

  }

      toggleImage() : void
      {
        this.showImage = !this.showImage;


      }

      _listFilter: string;
      set listFilter(value:string){

        this._listFilter = value;
        this.filterProducts = this._listFilter ? this.performFilter(this._listFilter) : this.products
      }
      get listFilter(): string {
            return this._listFilter;
      }

      performFilter(filterBy: string): IProduct[]{

filterBy = filterBy.toLowerCase();
return this.products.filter((product: IProduct)=> 
product.productName.toLowerCase().indexOf(filterBy) !== -1)



      }

      onRatingClicked(message: string): void{
        this.Pagetitle = message;
      }
}


