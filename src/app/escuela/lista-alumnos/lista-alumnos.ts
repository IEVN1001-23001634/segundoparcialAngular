import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IAlumno } from './alumno';

@Component({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'app-lista-alumnos',
  styleUrl: './lista-alumnos.css',
  templateUrl: './lista-alumnos.html',
})
export class ListaAlumnos {
  formulario!: FormGroup;
  alumnos: IAlumno[] = [];
  indiceEdicion: number = -1; 

  nuevoAlumno: IAlumno = {
    matricula: '',
    nombre: '',
    correo: '',
    materia: ''
  };

  ngOnInit(): void {
    this.cargarAlumnos()
    
    this.formulario = new FormGroup({
      matricula: new FormControl(''),
      nombre: new FormControl(''),
      correo: new FormControl(''),
      materia: new FormControl('')
    });
  }

  agregarAlumno(): void {
    if (
      this.nuevoAlumno.matricula === '' ||
      this.nuevoAlumno.nombre === '' ||
      this.nuevoAlumno.correo === '' ||
      this.nuevoAlumno.materia === ''
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }

    this.alumnos.push({ ...this.nuevoAlumno });

    localStorage.setItem(
      'alumnos', JSON.stringify(this.alumnos));
  }

  muestraAlumnos(): void {
    this.nuevoAlumno.matricula = this.formulario.value.matricula;
    this.nuevoAlumno.nombre = this.formulario.value.nombre;
    this.nuevoAlumno.correo = this.formulario.value.correo;
    this.nuevoAlumno.materia = this.formulario.value.materia;
    this.agregarAlumno()
  }

  cargarAlumnos(): void {
    const datos = localStorage.getItem('alumnos');

    if (datos) {
      this.alumnos = JSON.parse(datos);
    }
  }

  editarAlumno(index: number): void {
    this.nuevoAlumno = {
      ...this.alumnos[index]
    }
    const alumno = this.alumnos[index]
    this.formulario.patchValue({
      matricula: alumno.matricula,
      nombre: alumno.nombre,
      correo: alumno.correo,
      materia: alumno.materia
    })

    this.indiceEdicion = index
  }

  eliminarAlumno(index: number): void {
    this.alumnos.splice(index, 1)
    localStorage.setItem(
      'alumnos',
      JSON.stringify(this.alumnos)
    )
  }

  limpiarCampos(): void {
    this.nuevoAlumno = {
      matricula: '',
      nombre: '',
      correo: '',
      materia: ''
    }
    this.indiceEdicion = -1
  }
}
