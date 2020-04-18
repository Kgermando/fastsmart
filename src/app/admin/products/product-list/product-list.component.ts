import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/data/product.service';
import { ExcelService } from 'src/app/shared/services/data/excel.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ["Title", "Prix", "CategorySecteur", "Created", "edit", "remove"];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  products;

  constructor(private productService: ProductService,
              private excelService: ExcelService,
              private router: Router) {}

  ngOnInit(): void {
    // this.productService.getCollection$().subscribe(products => {
    //   this.products = products;
    //    console.log(products)

    //   this.dataSource = new MatTableDataSource(products);
    //   this.dataSource.sort = this.sort;
    //   this.dataSource.paginator = this.paginator;
    // })

    this.productService.getProductBySupplier().subscribe(
      list => {
          const products = list.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          }
        });
        // console.log(products)
        this.dataSource = new MatTableDataSource(products);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    })
  }
 

  addProductClick(){
    this.router.navigate(['/admin/products/product-add']);
  }

  removeProduct(id){
    this.productService.removeProductByID(id);
  }
 
  view(id) {
    this.router.navigate(['/admin/products/product-view', id]);
  }

  edit(id) {
    this.router.navigate(['/admin/products/product-edit', id]);
  }


  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.products, 'Backup');
  }

}
