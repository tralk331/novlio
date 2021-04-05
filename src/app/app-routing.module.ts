import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './dashboard/book/book.component';
import { BooksComponent } from './dashboard/books/books.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SeriesComponent } from './dashboard/series/series.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', redirectTo:'/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {
    path: 'dashboard', 
    component: DashboardComponent,
    children: [
      {path: '', redirectTo: 'series', pathMatch: 'full'},
      {path: 'series', component: SeriesComponent},
      {path: 'books', component: BooksComponent},
      {path: 'book/:bookId', component: BookComponent}
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
