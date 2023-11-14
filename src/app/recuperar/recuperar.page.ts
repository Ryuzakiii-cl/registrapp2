import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { StorageService } from 'src/app/servicios/storage.service';
import { HelperService } from 'src/app/servicios/helper.service';



@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  usuario: string = '';
  nuevaPassword: string = '';
  passwordActual: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private storageService: StorageService,
    private helperService: HelperService
  ) {}

  ngOnInit() {}

  async buscarUsuario() {
    const usuariosRegistrados = await this.storageService.obtenerUsuario();
    const usuarioEncontrado = usuariosRegistrados.find(
      (u: any) => u.usuario === this.usuario
    );

    if (usuarioEncontrado) {
      this.passwordActual = usuarioEncontrado.contrasena;
    } else {
      this.mostrarAlerta('Error', 'Usuario no se encuentra registrado');
      this.limpiarCampos();
    }
  }

  async cambiarPassword() {
    if (!this.nuevaPassword) {
      this.mostrarAlerta('Error', 'Debe ingresar una nueva contraseña.');
      return;
    }

    const usuariosRegistrados = await this.storageService.obtenerUsuario();
    const usuarioIndex = usuariosRegistrados.findIndex(
      (u: any) => u.usuario === this.usuario
    );

    if (usuarioIndex !== -1) {
      // Cambiar la contraseña
      usuariosRegistrados[usuarioIndex].contrasena = this.nuevaPassword;
      await this.storageService.agregarUsuario(usuariosRegistrados);
      this.mostrarAlerta('Éxito', 'Contraseña cambiada correctamente.');
      this.limpiarCampos();
    } else {
      this.mostrarAlerta('Error', 'Usuario no se encuentra registrado');
      this.limpiarCampos();
    }
  }

  limpiarCampos() {
    this.usuario = '';
    this.nuevaPassword = '';
    this.passwordActual = '';
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  back() {
    this.router.navigate(['/tabs/tab1']);
  }
}
