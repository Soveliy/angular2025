import { ApplicationConfig, Component, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Routes } from '@angular/router';

import { TopComponent } from './top/top.component';
import { FilmsComponent } from './films/films.component';
import { HomeComponent } from './home/home.component';

import { routes } from './app.routes';
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'top', component: TopComponent },
  { path: 'films', component: FilmsComponent }
]
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes)]
};


