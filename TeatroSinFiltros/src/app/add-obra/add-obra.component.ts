import { Component } from '@angular/core';
import { ObraService } from '../services/obra.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-obra',
  templateUrl: './add-obra.component.html',
  styleUrls: ['./add-obra.component.css']
})
export class AddObraComponent {
  obra = {
    titulo: '',
    imagen_url: '',
    descripcion: ''
  };

  constructor(private obraService: ObraService, private router: Router) { }

  onSubmit() {
    this.obraService.addObra(this.obra).subscribe({
      next: (response) => {
        console.log('Obra agregada con éxito', response);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error al agregar obra', error);
        alert('Error al agregar la obra. Por favor, inténtalo de nuevo.');
      }
    });
  }
}
