import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private afs: AngularFirestore) { }

  getCategories() {
  return this.afs.collection('categories', ref => ref.orderBy('name')).snapshotChanges();
  }
}
