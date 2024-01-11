import { Component, OnInit } from '@angular/core';
import { ObraService } from '../services/obra.service';
import { AuthenticationService } from '../services/authentication.service';
 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  title = 'TeatroSinFiltros';
  shows: any[] = [];

  constructor(private obraService: ObraService,  public authService: AuthenticationService 
    ) { }

  ngOnInit() {
    this.obraService.getObras().subscribe(
      (data) => {
        console.log(data);
        this.shows = data;
      },
      (error) => {
        console.error('Error al obtener obras', error);
      }
    );
  }
  
  get isUserAdmin(): boolean {
    return this.authService.getUserRole === 'admin';
  }

  handleEdit(obra: any) {
    // Tu lógica para manejar la edición de una obra
  }

  handleDelete(obra: any) {
    // Tu lógica para manejar la eliminación de una obra
  }
}
 
 

