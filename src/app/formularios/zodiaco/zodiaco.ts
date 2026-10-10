import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-zodiaco',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './zodiaco.html',
  styleUrl: './zodiaco.css'
})
export class Zodiaco implements OnInit {

  formulario!: FormGroup;

  nombreCompleto: string = '';
  edad: number | null = null;
  signo: string = '';
  imagenSigno: string = '';
  mostrado: boolean = false;

  
  private signosChinos = [
    { nombre: 'Rata', imagen: 'https://img.icons8.com/color/96/rat.png' },
    { nombre: 'Buey', imagen: 'https://img.icons8.com/color/96/ox.png' },
    { nombre: 'Tigre', imagen: 'https://img.icons8.com/color/96/tiger.png' },
    { nombre: 'Conejo', imagen: 'https://img.icons8.com/color/96/rabbit.png' },
    { nombre: 'Dragón', imagen: 'https://img.icons8.com/color/96/dragon.png' },
    { nombre: 'Serpiente', imagen: 'https://img.icons8.com/color/96/snake.png' },
    { nombre: 'Caballo', imagen: 'https://img.icons8.com/color/96/horse.png' },
    { nombre: 'Cabra', imagen: 'https://img.icons8.com/color/96/goat.png' },
    { nombre: 'Mono', imagen: 'https://img.icons8.com/color/96/monkey.png' },
    { nombre: 'Gallo', imagen: 'https://img.icons8.com/color/96/rooster.png' },
    { nombre: 'Perro', imagen: 'https://img.icons8.com/color/96/dog.png' },
    { nombre: 'Cerdo', imagen: 'https://img.icons8.com/color/96/pig.png' }
  ];

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      apaterno: new FormControl(''),
      amaterno: new FormControl(''),
      dia: new FormControl(''),
      mes: new FormControl(''),
      anio: new FormControl(''),
      sexo: new FormControl('Masculino')
    });
  }

  imprimir(): void {
    const values = this.formulario.value;

    this.nombreCompleto = `${values.nombre} ${values.apaterno} ${values.amaterno}`;

    const anioNac = Number(values.anio);
    const mesNac = Number(values.mes);
    const diaNac = Number(values.dia);

    const hoy = new Date();
    let edadCalculada = hoy.getFullYear() - anioNac;
    const difMeses = hoy.getMonth() + 1 - mesNac;

    if (difMeses < 0 || (difMeses === 0 && hoy.getDate() < diaNac)) {
      edadCalculada--;
    }
    this.edad = edadCalculada;

    let indiceSigno = (anioNac - 4) % 12;
    if (indiceSigno < 0) indiceSigno += 12;

    this.signo = this.signosChinos[indiceSigno].nombre;
    this.imagenSigno = this.signosChinos[indiceSigno].imagen;

    this.mostrado = true;
  }
}