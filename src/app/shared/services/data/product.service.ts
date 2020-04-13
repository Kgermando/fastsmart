import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { QueryFn, AngularFirestoreCollection, AngularFirestore,
         AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

 // Collection Database
 readonly path = 'Products';

 private productcollection: AngularFirestoreCollection<Product>;

 // Pour la methode getOneProduct()
 private productDoc: AngularFirestoreDocument<Product>;
 public product: Observable<Product>;


 constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
   this.productcollection = this.afs.collection<Product>('Products', (ref) => {
     return ref.orderBy('Created', 'desc');
   });
  }

  // create Product
 add(data: Product, imageFile: File) {
   if (imageFile) {
     const path = `images/${new Date().getTime()}_${imageFile.name}`;

     this.storage.upload(path, imageFile).then(() => {
       this.storage.ref(path).getDownloadURL().subscribe( imageURL => {
         this.uploadPostToFirestore(data, imageURL);
       });
     });
   } else {
     this.uploadPostToFirestore(data);
   }
 }

 // Remove data in database
 remove(id: string): Promise<void> {
   return this.afs.doc<Product>(`${this.path}/${id}`).delete();
 }

 // Update data in database
 update(data: Product, imageFile: File) {
   if (imageFile) {
     const path = `images/${new Date().getTime()}_${imageFile.name}`;

     this.storage.upload(path, imageFile).then(() => {
       this.storage.ref(path).getDownloadURL().subscribe( imageURL => {
         this.uploadPostToFirestore(data, imageURL);
       });
     });
   } else {
     this.uploadPostToFirestore(data);
   }
 }

 // Get all data in database
 getCollection$(ref?: QueryFn): Observable<Product[]> {
   return this.afs.collection<Product>(this.path, ref)  // => ref.orderBy('Created', 'asc')
     .snapshotChanges()
     .pipe(map(actions => {
       return actions.map(a => {
         const data = a.payload.doc.data() as Product;
         const id = data.id;
         return { id, ...data };
       });
     })
     );
 }

 // Get all data in database in orderBy desc
 getAllCollection$(): Observable<Product[]> {
     // tslint:disable-next-line: no-shadowed-variable
     return this.afs.collection<Product>(this.path, ref => ref.orderBy('Created', 'desc'))
       .snapshotChanges()
       .pipe(map(actions => {
         return actions.map(a => {
           const data = a.payload.doc.data() as Product;
           const id = data.id;
           return { id, ...data };
         });
       })
       );
   }

 // Geet one data in database
 getOneProduct(idProduct: string) {
   this.productDoc = this.afs.doc<Product>(`Products/${idProduct}`);
   return this.product = this.productDoc.snapshotChanges().pipe(map(action => {
     if (action.payload.exists === false) {
       return null;
     } else {
       const data = action.payload.data();
       data.Created = new Date(data.Created.seconds * 1000);
       data.id = action.payload.id;
       return data;
     }
   }));
 }

 // Upload Logo if exist
 uploadPostToFirestore(data: Product, imageURL?: string) {
   if (imageURL) {
     data.ImageURL = imageURL;
   }
   return this.afs.doc<Product>(`${this.path}/${data.id}`).set(data).then((error => {
     console.log(error);
   }));
 }

}
