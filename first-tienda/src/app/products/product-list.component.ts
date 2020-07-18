import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: 'product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = true;
    errorMessage: string;

    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value:string){
        this._listFilter = value;
        this.filteredProducts= this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    filteredProducts: IProduct[];
    products: IProduct[] = [
        {
            "productId" : 2,
            "productName" : "Garden Cart",
            "productCode" : "GDN-0023",
            "releaseDate" : "March 18, 2019",
            "description" : "15 gallos capacity rolling garden shot",
            "price" : 32.99,
            "starRating" : 4.2,
            "imageUrl" : "assets/images/garden_cart.png"
        },
        {
            "productId" : 5,
            "productName" : "Hammer",
            "productCode" : "TBX-48103",
            "releaseDate" : "May 21, 2019",
            "description" : "Curved claw stell hammer",
            "price" : 2.99,
            "starRating" : 4.8,
            "imageUrl" : "assets/images/hammer.png"
        }
    ];

    constructor(private productService: ProductService) {
    }
    
    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }

    performFilter(filterBy:string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }
    
    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this.productService.getProducts().subscribe({
            next: products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
        });
    }
} 