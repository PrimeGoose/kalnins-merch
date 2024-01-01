import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of, from} from 'rxjs'; // import 'from' from 'rxjs'
import {catchError, map, mergeMap} from 'rxjs/operators';
import * as AppActions from '../actions/app.actions';
import {SupabaseService} from 'src/app/core/services/supabase.service';

@Injectable()
export class AppEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.loadProducts),
      mergeMap(() =>
        from(this.db.getAllProductsService()).pipe(
          // convert Promise to Observable
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
