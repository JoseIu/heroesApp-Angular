import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { Hero } from '../../interfaces/herto.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit, OnDestroy {
  public searchInput = new FormControl('');
  public heroes: Hero[] = [];
  public selectedhero?: Hero;

  //Debounce
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;
  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    //debounce
    this.debouncer
      .pipe(debounceTime(300))
      .subscribe((inputValue) => this.searchHero(inputValue));
  }
  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe;
  }

  //cojemos el valor y en .next para el debounce
  public onKeyPres(): void {
    const inputValue: string = this.searchInput.value || '';
    this.debouncer.next(inputValue);
  }

  //hacemos la busqueda
  public searchHero(querry: string): void {
    this.heroesService
      .getSuggestions(querry)
      .subscribe((heroes) => (this.heroes = heroes));
  }

  onSelectedOption(env: MatAutocompleteSelectedEvent): void {
    console.log(env.option.value);

    if (!env.option.value) {
      // this.selectedhero = undefined;
      return;
    }

    const { superhero } = env.option.value;

    this.searchInput.setValue(superhero);
    this.selectedhero = env.option.value;
    console.log('SELECTED', this.selectedhero);
  }
}
