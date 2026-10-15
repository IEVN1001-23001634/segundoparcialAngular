import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-lista-zodiaco',
  imports: [CommonModule, RouterLink],
  templateUrl: './lista-zodiaco.html',
  styleUrl: './lista-zodiaco.css'
})
export class ListaZodiaco implements OnInit {
  registros: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.cargarRegistros();
  }

  cargarRegistros(): void {
    const datos = localStorage.getItem('zodiacoRegistros');
    if (datos) {
      this.registros = JSON.parse(datos);
    }
  }

  eliminarRegistro(index: number): void {
    this.registros.splice(index, 1);
    localStorage.setItem('zodiacoRegistros', JSON.stringify(this.registros));
  }

  editarRegistro(index: number): void {
    // Guarda el índice que se va a editar y redirige al formulario de zodiaco
    localStorage.setItem('indiceEdicionZodiaco', index.toString());
    this.router.navigate(['/zodiaco']);
  }
}
