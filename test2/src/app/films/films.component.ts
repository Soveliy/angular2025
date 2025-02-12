import { Component } from '@angular/core';
import { LowerCasePipe, UpperCasePipe, PercentPipe, CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-films',
  imports: [LowerCasePipe,UpperCasePipe,PercentPipe,CurrencyPipe],
  templateUrl: './films.component.html',
  styleUrl: './films.component.scss'
})
export class FilmsComponent {
  name = 'title';
  number = 1000;
  isLogin = false;
  filmsList = [{
    id:0,
    title: 'Люди в черном',
    year: 2001,
  },
  {
    id:1,
    title: 'Люди в черном 2',
    year: 2002,
  },
  {
    id:2,
    title: '',
    year: 2002,
  },
]
}
