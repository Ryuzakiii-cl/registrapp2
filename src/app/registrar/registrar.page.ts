import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ServiciosService } from 'src/app/servicios/servicios.service';
import { Router } from '@angular/router';
import { Region } from 'src/app/models/region';
import { Comuna } from 'src/app/models/comuna';
import { StorageService } from 'src/app/servicios/storage.service';
import { HelperService } from 'src/app/servicios/helper.service';

@Component({
  selector: 'app-registrar',
  templateUrl: 'registrar.page.html',
  styleUrls: ['registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  email: string = '';
  contrasena: string = '';
  regiones: Region[] = [];
  comunas: Comuna[] = [];
  regionSeleccionado: number = 0;
  comunaSeleccionada: number = 0;
  nombre: string = '';
  apellido: string = '';
  rut: string = '';
  usuario: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private serviciosService: ServiciosService,
    private auth: AngularFireAuth,
    private storageService: StorageService,
    private helper: HelperService
  ) {}

  ngOnInit() {
    this.cargarRegion();
    this.viewUser();
  }

  async viewUser() {
    console.log(
      'USUARIOS REGISTRADOS',
      await this.storageService.obtenerUsuario()
    );
  }

  async cargarRegion() {
    const req = await this.serviciosService.getRegion();
    this.regiones = req.data;
    console.log('REGION', this.regiones);
  }

  async cargarComuna() {
    const req = await this.serviciosService.getComuna(this.regionSeleccionado);
    this.comunas = req.data;
  }

  async registro() {
    const loader = await this.helper.showLoading('Cargando');
    try {
      var user = [
        {
          correo: this.email,
          contrasena: this.contrasena,
          nombre: this.nombre,
          apellido: this.apellido,
          rut: this.rut,
          usuario: this.usuario,
          region: this.regionSeleccionado,
          comuna: this.comunaSeleccionada,
        },
      ];
      const request = await this.auth.createUserWithEmailAndPassword(
        this.email,
        this.contrasena
      );
      this.storageService.agregarUsuario(user);
      await this.helper.showAlert(
        'Usuario registrado corretamente', 
        'Información'
      );
      await this.router.navigateByUrl('/tabs/tab1');
      await loader.dismiss();
    } catch (error: any) {
      if (error.code == 'auth/invalid-email') {
        await loader.dismiss();
        await this.helper.showAlert('Error en el formato del correo', 'Error');
      }
      if (error.code == 'auth/weak-password') {
        await loader.dismiss();
        await this.helper.showAlert(
          'El largo de la contraseña es incorrecto',
          'Error'
        );
      }
    }
  }

  limpiarCampos() {
    this.nombre = '';
    this.apellido = '';
    this.rut = '';
    this.usuario = '';
    this.password = '';
    this.regionSeleccionado = 0;
    this.comunaSeleccionada = 0;
    this.email = '';
    this.contrasena = '';
  }

  back() {
    this.router.navigate(['/tabs/tab1']);
  }
}
