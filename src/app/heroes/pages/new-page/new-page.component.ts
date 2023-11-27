import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, of, switchMap } from 'rxjs';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { Hero, Publisher } from '../../interfaces/herto.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.scss'],
})
export class NewPageComponent implements OnInit {
  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl('', { nonNullable: true }), //nonNullable siempre va se string
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });
  public publuhers = [
    {
      id: 'Marvel Comics',
      text: 'Marvel-Comics',
    },
    {
      id: 'DC Comics',
      text: 'DC-Comics',
    },
  ];

  constructor(
    private heroesService: HeroesService,
    private activateRoute: ActivatedRoute,
    private snackbar: MatSnackBar,
    private route: Router,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.activateRoute.params
      .pipe(
        switchMap(({ id }) => {
          //si no hay id no hace la peticion
          if (!id) return of(null);
          return this.heroesService.getHero(id);
        })
      )
      .subscribe((hero) => {
        if (!hero) return;
        if (hero) return this.heroForm.patchValue(hero);
      });
  }

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }
  onSubmit(): void {
    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this.heroesService.updateHero(this.currentHero).subscribe((hero) => {
        this.route.navigateByUrl('/heroes/list');
        this.showSnackbar(`${hero.superhero} updated correctly!`);
      });
      return;
    }

    this.heroesService.addHero(this.currentHero).subscribe((hero) => {
      this.route.navigate(['/heroes/edit', hero.id]);

      this.showSnackbar(`${hero.superhero} added correctly!`);
    });
  }

  onDeleteHero() {
    if (!this.currentHero.id) throw new Error('Hero id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.currentHero,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((dialogResult: boolean) => dialogResult),
        switchMap(() => this.heroesService.deleteHeroById(this.currentHero.id)),
        filter((wasDeleted: boolean) => wasDeleted)
      )
      .subscribe(() => {
        this.showSnackbar(
          `Hero ·${this.currentHero.superhero} deleted correctly!`
        );
        return this.route.navigateByUrl('/heroes/list');
      });
  }

  showSnackbar(message: string): void {
    this.snackbar.open(message, 'ok', { duration: 2500 });
  }
}
