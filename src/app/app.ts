import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Api } from './services/api';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
   title = 'Consumindo API com Angular (Standalone)';
  public objects: any[] = [];

  // A lógica do construtor e do ngOnInit é a mesma
  constructor(private apiService: Api) {}

  ngOnInit(): void {
    this.carregarObjetos();
  }

  public carregarObjetos(): void {
    this.apiService.getObjects().subscribe(
      (data: any[]) => {
        this.objects = data;
        console.log(this.objects);
      },
      (error) => {
        console.error('Erro ao buscar objetos:', error);
      }
    );
  }
}
