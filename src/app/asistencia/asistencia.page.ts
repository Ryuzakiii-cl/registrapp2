import { Component, OnInit, inject } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Router, ActivatedRoute } from "@angular/router";
import { Camera, CameraResultType, CameraSource, CameraDirection } from '@capacitor/camera'; //instalar npm i @capacitor/camera
import { defineCustomElements } from '@ionic/pwa-elements/loader'; //instalar npm i @capacitor/pwa-elementsloader
//
import { StorageService } from '../servicios/storage.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  resultadoEscaneo: string | null = null;
  timestamp1: string;
  timestamp2: string;
  nombre: string | null = null;
  rut: string | null = null;
  correo: string | null = null;  // Agregado para correo
  coordenadas: string | null = null;
  router = inject(Router);
  capturedImage: string | null = null;
  imagens: any[] = [];

  constructor(
    private activatedrouter: ActivatedRoute,
    private storageService: StorageService
  ) {
    this.activatedrouter.paramMap.subscribe(async (params) => {
      this.resultadoEscaneo = params.get('resultadoEscaneo');
      await this.obtenerDatosUsuarioActual();  // Llama a la función para obtener detalles del usuario
    });

    const fecha = new Date();
    this.timestamp1 = fecha.toLocaleDateString();

    const hora = new Date();
    this.timestamp2 = hora.toLocaleTimeString();
  }

  ngOnInit() {
    defineCustomElements(window);
    this.obtenerCoordenadas();
  }

  async openFrontCamera() {
    try {
      const photo = await Camera.getPhoto({
        quality: 100,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        direction: CameraDirection.Front,
      });
  
      if (photo.webPath) {
        this.capturedImage = photo.webPath;
      } else {
        console.error('La propiedad webPath de la foto es undefined');
      }
    } catch (error) {
      console.error('Error al abrir la cámara frontal: ', error);
    }
  }

  async obtenerCoordenadas() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      const latitud = coordinates.coords.latitude;
      const longitud = coordinates.coords.longitude;
      this.coordenadas = `Latitud: ${latitud} , Longitud: ${longitud}`;
    } catch (error) {
      console.error('Error al obtener las coordenadas:', error);
    }
  }

  async obtenerDatosUsuarioActual() {
    const usuario = await this.storageService.obtenerNombreUsuarioActual();
    if (usuario) {
      this.nombre = usuario.nombre;
      this.rut = usuario.rut;
      this.correo = usuario.correo;
    }
  }
  

  back() {
    this.router.navigate(['/sesion']);
  }

  cerrarSesion() {
    this.storageService.removeItem('usuarioData');
    this.router.navigate(['/tabs/tab1']);
  }
  
}
