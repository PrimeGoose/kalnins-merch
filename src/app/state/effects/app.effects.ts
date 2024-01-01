import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import * as AppActions from '../actions/app.actions';
import {SupabaseService} from 'src/app/core/services/supabase.service';

@Injectable()
export class AppEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.loadProducts),
      mergeMap(() =>
        this.db.getAllProductsService().pipe(
          map((items) => AppActions.loadProductsSuccess({items})),
          catchError((error) => of(AppActions.loadProductsFailure({error}))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private db: SupabaseService,
  ) {}
}
