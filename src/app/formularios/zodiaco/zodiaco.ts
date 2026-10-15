import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-zodiaco',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
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
  registros: any[] = [];
  indiceEdicion: number = -1;

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
    this.cargarRegistros();

    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      apaterno: new FormControl(''),
      amaterno: new FormControl(''),
      dia: new FormControl(''),
      mes: new FormControl(''),
      anio: new FormControl(''),
      sexo: new FormControl('Masculino')
    });

    // Verificar si hay un registro pendiente de edición
    const indexEdicionGuardado = localStorage.getItem('indiceEdicionZodiaco');
    if (indexEdicionGuardado !== null) {
      this.indiceEdicion = Number(indexEdicionGuardado);
      const reg = this.registros[this.indiceEdicion];
      if (reg) {
        // Separar el nombre completo guardado para rellenar los inputs si es necesario
        // O si prefieres guardar los campos individuales, también puedes hacerlo. 
        // Por simplicidad, aquí rellenamos lo básico con los datos guardados:
        const partesNombre = reg.nombreCompleto.split(' ');
        this.formulario.patchValue({
          nombre: partesNombre[0] || '',
          apaterno: partesNombre[1] || '',
          amaterno: partesNombre[2] || '',
          sexo: reg.sexo
        });
      }
    }
  }

  cargarRegistros(): void {
    const datos = localStorage.getItem('zodiacoRegistros');
    if (datos) {
      this.registros = JSON.parse(datos);
    }
  }

  imprimir(): void {
    const values = this.formulario.value;

    if (!values.nombre || !values.apaterno || !values.amaterno || !values.dia || !values.mes || !values.anio) {
      alert('Todos los campos son obligatorios');
      this.mostrado = false;
      return;
    }

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

    const datosRegistro = {
      nombreCompleto: this.nombreCompleto,
      edad: this.edad,
      signo: this.signo,
      imagenSigno: this.imagenSigno,
      sexo: values.sexo
    };

    // Si estamos editando, actualiza la posición existente; si no, haz push
    if (this.indiceEdicion >= 0) {
      this.registros[this.indiceEdicion] = datosRegistro;
      localStorage.removeItem('indiceEdicionZodiaco');
      this.indiceEdicion = -1;
    } else {
      this.registros.push(datosRegistro);
    }

    localStorage.setItem('zodiacoRegistros', JSON.stringify(this.registros));
    this.mostrado = true;
  }
}