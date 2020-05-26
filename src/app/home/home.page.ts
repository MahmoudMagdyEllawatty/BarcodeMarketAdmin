import {Component, OnInit} from '@angular/core';
import {BarcodeScanner, BarcodeScannerOptions} from '@ionic-native/barcode-scanner/ngx';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  scanning = false;
  constructor(public barcodeScanner: BarcodeScanner,
              public qrScanner: QRScanner) {

  }
  ngOnInit(): void {
    this.scanQRCode();
  }

  scanQRCode() {
   this.barcodeScanner.scan()
       .then(data => {
         alert(data.text);
       }).catch(e => {
         alert(e);
   });
  }

  closeScanner() {

  }

}
