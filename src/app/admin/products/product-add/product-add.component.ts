import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/models/product';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/data/product.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { SpinnerService } from 'src/app/shared/services/data/spinner.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  productFG: FormGroup;
  product: Product = {
    id: '',
    Title: '',
    Description: '',
    Prix: '',
    productImageUrl: '',
    Content: '',
    // Payement: '',
    CaterogyProduit: '',
    CategorySecteur: '', // Ex: Sante , transport, technologies
    UrlTest: '',
    Rating: '',
    Support: '',
    Created: null
  }

  isPreview = false;
  getSupplierID: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private storage: AngularFireStorage,
              private productService: ProductService,
              private sharedService: SpinnerService) { 
                
              }

  ngOnInit(): void {
    this.makingAddProductForm();
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

  getUserId(){
    this.productService.getUserId().subscribe(res=>{
      this.getSupplierID = res;
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
    this.productService.createProduct(this.product);
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
    this.snapshot = this.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = this.storage.ref(path).getDownloadURL()
          console.log(this.downloadURL); // Get a Observable
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