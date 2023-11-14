import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { HelperService } from 'src/app/servicios/helper.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  usuario: string = '';
  password: string = '';


  constructor(
    public navCtrl: NavController, 
    private alertController: AlertController,
    private router:Router,
    private helperService:HelperService,
    private storage:StorageService,
    private auth:AngularFireAuth) {}
      




  async iniciarSesion() {
    const loader = await this.helperService.showLoading("Cargando");

    if (this.usuario === "" || this.password === "") {
      this.helperService.showAlert("Debe ingresar un nombre de usuario y una contraseña.", "Error");
      loader.dismiss();
      return;
    }

    try {
      const usuarioGuardado = await this.storage.obtenerNombreUsuario(this.usuario);

      if (!usuarioGuardado || usuarioGuardado.contrasena !== this.password) {
        throw new Error("Credenciales incorrectas");
      }

      // Autenticación exitosa
      loader.dismiss();
      await this.router.navigateByUrl('sesion');
    } catch (error) {
      loader.dismiss();
      this.helperService.showAlert("Credenciales incorrectas.", "Error");
    }
  }
  



      Registrar() {
        this.navCtrl.navigateForward('/registrar'); 
        this.usuario = '';
        this.password = '';
          }

      recuperar(){
        this.navCtrl.navigateRoot('/recuperar')
      }

}



