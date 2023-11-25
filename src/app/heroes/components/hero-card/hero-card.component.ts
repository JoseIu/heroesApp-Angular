import { Component, Input } from '@angular/core';
import { Hero } from '../../interfaces/herto.interface';

@Component({
  selector: 'hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss'],
})
export class HeroCardComponent {
  @Input() public heroes: Hero[] = [];
}
