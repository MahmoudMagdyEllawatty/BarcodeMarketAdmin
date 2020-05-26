import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

export interface Trader {
  id: string,
  state: number,
  joinDate: string,
  period: number,
  lastDate: string,
  password: string,
  userName: string,
  shopName: string,
  area: number,
  photoURL: string,
  licenseURL: string,
  videoURL: string,
  phoneNo: string,
  mainCode: string,
  latitude: number,
  longitude: number,
  isMinion: boolean,
  code: string
}

@Injectable({
  providedIn: 'root'
})
export class TraderServiceService {
  private traders: Observable<Trader[]>;
  private collection: AngularFirestoreCollection<Trader>;
  private node = 'traders';
  constructor(private afs: AngularFirestore) {
    this.collection = this.afs.collection<Trader>(this.node);
  }

  getTraders(): Observable<Trader[]> {
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

  addTrader(trader: Trader): Promise<DocumentReference> {
    return this.collection.add(trader);
  }

  updateTrader(trader: Trader): Promise<void> {
    return this.collection.doc(trader.id).update(trader);
  }

  deleteTrader(trader: Trader): Promise<void> {
    return this.collection.doc(trader.id).delete();
  }


}
