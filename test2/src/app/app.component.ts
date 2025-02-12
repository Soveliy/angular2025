import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FilmsComponent } from './films/films.component';
@Component({
  selector: 'my-root',
  imports: [RouterOutlet, FilmsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Hello world';
  name = 'Nikita';
}
