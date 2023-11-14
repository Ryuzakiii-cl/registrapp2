import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences'; 

const storageUsuario = "usuarioData";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public userCorreo = "";

  async getItem(llave: string): Promise<string | null> {
    const obj = await Preferences.get({ key: llave });
    return obj.value;
  }

  async setItem(llave: string, valor: string): Promise<void> {
    await Preferences.set({ key: llave, value: valor });
  }

  async obtenerNombreUsuario(usuario: string): Promise<any | null> {
    const usuarios = await this.obtenerUsuario();
    const usuarioEncontrado = usuarios.find((u: any) => u.usuario === usuario);
    return usuarioEncontrado || null;
  }

  async obtenerDatosUsuarioActual(): Promise<any | null> {
    const usuario = await this.obtenerNombreUsuarioActual();
    return usuario || null;
  }
  
  
  async obtenerNombreUsuarioActual(): Promise<any | null> {
    const usuarios = await this.obtenerUsuario();
    return usuarios.length > 0 ? usuarios[0] : null;
  }
  

  async obtenerUsuario(): Promise<any[]> {
    const storageData = await this.getItem(storageUsuario);
    return storageData ? JSON.parse(storageData) : [];
  }

  async agregarUsuario(user: any[]): Promise<void> {
    const usuarios = await this.obtenerUsuario();
    for (const i of usuarios) {
      if (i) {
        user.push(i);
      }
    }
    this.setItem(storageUsuario, JSON.stringify(user));
  }

  async removeItem(llave: string): Promise<void> {
    await Preferences.remove({ key: llave });
  }
}
