import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Hero } from '../../interfaces/herto.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.scss'],
})
export class HeroPageComponent implements OnInit {
  public hero?: Hero;

  constructor(
    private heroresService: HeroesService,
    //Para pillar los parametros(ID) de la URL
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroresService.getHero(id)))
      .subscribe((hero) => {
        if (!hero) return this.router.navigate(['/herores/list']);

        this.hero = hero;
        console.log(this.hero);
        return;
      });
  }
}
