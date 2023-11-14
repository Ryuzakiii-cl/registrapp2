// sesion.page.ts

import { Component, OnInit, inject } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { BarcodeScanner } from 'capacitor-barcode-scanner';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../servicios/storage.service';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.page.html',
  styleUrls: ['./sesion.page.scss'],
})
export class SesionPage implements OnInit {
  public alertButtons = ['OK'];
  public alertInputs = [
    {
      label: 'Si',
      type: 'radio',
      value: 'red',
    },
    {
      label: 'Si',
      type: 'radio',
      value: 'blue',
    },
  ];
  usuario: string | null = null;

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private activatedrouter: ActivatedRoute,
    private storageService: StorageService,
    private router: Router

  ) {
    this.activatedrouter.paramMap.subscribe((params) => {
      this.obtenerNombreUsuario();
    });
  }

  ngOnInit() {}

  async obtenerNombreUsuario() {
    const usuarioActual = await this.storageService.obtenerNombreUsuarioActual();
    if (usuarioActual) {
      this.usuario = usuarioActual.nombre;
    } else {
      this.usuario = ""; // O cualquier valor predeterminado si el usuario no está presente
    }
  }
  
  async anto() {
    const resultadoScan = await BarcodeScanner.scan();
    if (resultadoScan.result) {
      console.log('resulatdo escaner', resultadoScan.code);
      this.navCtrl.navigateForward(['/asistencia', { resultadoEscaneo: resultadoScan.code }]);
    } else {
      alert('No es posible capturar la información.');
    }
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }


    cerrarSesion() {
      this.storageService.removeItem('usuarioData');
      this.router.navigate(['/tabs/tab1']);
    }
    
  }

