import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../servicios/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private storageService: StorageService
  ) {}

  async canActivate(): Promise<boolean> {
    const usuarioActual = await this.storageService.obtenerNombreUsuarioActual();

    if (usuarioActual) {
      return true; // Usuario autenticado
    } else {
      setTimeout(() => {
        this.router.navigate(['/e404']);
        setTimeout(() => {
          this.router.navigate(['/tabs/tab1']);
        }, 2000);
      }, 0);

      return false; // Usuario no autenticado
    }
  }
}
