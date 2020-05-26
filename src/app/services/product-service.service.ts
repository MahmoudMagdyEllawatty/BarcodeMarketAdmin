import { Injectable } from '@angular/core';
import {Trader} from './trader-service.service';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

export interface Product {
  id: string,
  name: string,
  unitSellPrice: number,
  cartoonSellPrice: number,
  productPurchases: ProductPurchases[],
  cartoonUnits: number,
  trader: Trader
}

export interface ProductPurchases {
  qnt: number,
  cartoonPurchasePrice: number,
  unitPurchasePrice: number,
  date: string
}

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private products: Observable<Product[]>;
  private collection: AngularFirestoreCollection<Product>;
  private node = 'products';
  constructor(private afs: AngularFirestore) {
    this.collection = this.afs.collection<Product>(this.node);
  }

  getProducts(): Observable<Product[]> {
    return this.collection.snapshotChanges()
        .pipe(
            map(actions => {
              return actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              });
            })
        );
  }

  addProduct(trader: Product): Promise<DocumentReference> {
    return this.collection.add(trader);
  }

  updateProduct(trader: Product): Promise<void> {
    return this.collection.doc(trader.id).update(trader);
  }

  deleteProduct(trader: Product): Promise<void> {
    return this.collection.doc(trader.id).delete();
  }

}
