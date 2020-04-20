import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { ProductService } from 'src/app/shared/services/data/product.service';
import { SpinnerService } from 'src/app/shared/services/data/spinner.service';
import { Product } from 'src/app/shared/models/product';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  productid: any;

  productFG: FormGroup;
  product: Product = {
    id: '',
    Title: '',
    Description: '',
    Prix: 0,
    productImageUrl: '',
    Content: '',
    // Payement: '',
    CaterogyProduit: '',
    CategorySecteur: '',
    UrlTest: '',
    Rating: 0,
    Support: '',
    Created: null
  }

  isPreview = false;
  getSupplierID: string;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private storage: AngularFireStorage,
    private productService: ProductService,
    private sharedService: SpinnerService) { 
      
    }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get("id");
    if (productId) {
      this.getProductby(productId);
      this.productid = productId;
    }
  }

  makingAddProductForm() {
    this.productFG = this.formBuilder.group({
      id: [''],
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      Content: ['', Validators.required],
      Prix: ['', Validators.required],
      // Payement: '',
      CaterogyProduit: ['', Validators.required],
      CategorySecteur: ['', Validators.required],
      UrlTest: ['', Validators.required],
      Rating: ['', Validators.required],
      Support: ['', Validators.required],
    })
  }

  onSubmit() {
    this.product = {
      Title: this.productFG.value.Title,
      Description: this.productFG.value.Description,
      Content: this.productFG.value.Content,
      Prix: this.productFG.value.Prix,
      productImageUrl: this.imgDownloadUrl,
      Created: new Date(),
      CaterogyProduit: this.productFG.value.CaterogyProduit,
      CategorySecteur: this.productFG.value.CategorySecteur,
      UrlTest: this.productFG.value.UrlTest,
      Rating: this.productFG.value.Rating,
      Support: this.productFG.value.Support
    };
    this.productService.updateProduct(this.product, this.productid);
    this.showSnackbar();
    this.router.navigate(['/admin/products/product-list'])
  }

  showSnackbar() {
		this.sharedService.openSnackBar({
			duration: 1,
			data: {
				isAccepted: true,
				message: 'Product Created Successfully'
			},
			panelClass: [ 'recovery-snackbar' ]
		});
	}

  getImageUrl(){
    if(this.imgDownloadUrl == null){
      if(this.product.productImageUrl == null){
      }
      else{
        return this.product.productImageUrl;
      }
    }
    else{
      return this.imgDownloadUrl;
    }
  }

  getProductby(productId) {
    this.productService.getProductByProductId(productId).subscribe(product => {
      this.patchData(product.data);
      this.product = product.data;
    });
    // console.log(this.productInfo););
  }

  patchData(product: Product) {
    this.productFG.patchValue({
      Title: product.Title,
      Description: product.Description,
      Content: product.Content,
      Prix: product.Prix,
      CaterogyProduit: product.CaterogyProduit,
      CategorySecteur: product.CategorySecteur,
      UrlTest: product.UrlTest,
      Rating: product.Rating,
      Support: product.Support,
    });
  }

  // Main task
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;

  //download url string
  imgDownloadUrl: string;
  

  // State for dropzone CSS toggling
  isHovering: boolean;

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    this.isPreview = true;
    // The File object
    const file = event.item(0);

    // Client-side validation example
    if (file.type.split("/")[0] !== "image") {
      console.error("unsupported file type :( ");
      return;
    }

    // The storage path
    const path = `Product/${new Date().getTime()}_${file.name}`;
    const fileRef = this.storage.ref(path);
    // Totally optional metadata
    const customMetadata = { app: "My AngularFire-powered PWA!" };

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });

    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    //Download URL file
    this.snapshot = this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.storage.ref(path).getDownloadURL();
        this.downloadURL.subscribe(res => {
          if (res) {
            this.imgDownloadUrl = res;
            
          }
        });
      })
    );

  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return (
      snapshot.state === "running" &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }

}
