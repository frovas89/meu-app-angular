import { Routes } from '@angular/router';
import { ObjectList } from './components/object-list/object-list';
import { ObjectDetail } from './components/object-detail/object-detail';
import { ObjectForm } from './components/object-form/object-form';

export const routes: Routes = [
  { path: 'objects', component: ObjectList },
  { path: 'objects/new', component: ObjectForm }, // Rota para criar
  { path: 'objects/:id', component: ObjectDetail }, // Rota para ver detalhes
  { path: 'objects/:id/edit', component: ObjectForm }, // Rota para editar
  { path: '', redirectTo: '/objects', pathMatch: 'full' }, // Redireciona a raiz para a lista
  { path: '**', redirectTo: '/objects' } // Rota coringa
];
