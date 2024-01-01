import {createReducer, on} from '@ngrx/store';
import * as AppActions from '../actions/app.actions';

export const initialState: Record<string, any> = {items: [], error: null};

export const appReducer = createReducer(
  initialState,
  on(AppActions.loadProductsSuccess, (state, {items}) => ({...state, items})),
  on(AppActions.loadProductsFailure, (state, {error}) => ({...state, error})),
);
