// product.reducer.ts
import {ActionReducer, createReducer, on} from '@ngrx/store';
import * as AppActions from '../actions/product.actions';
import {Product} from 'src/app/core/models/product.model';

export const initialState: Record<string, any> = {items: [], error: null};

export const appReducer: ActionReducer<Record<string, any>> = createReducer(
  initialState,
  on(AppActions.loadProductsSuccess, (state: Record<string, Product>, {items}) => ({...state, items})),
  on(AppActions.loadProductsFailure, (state, {error}) => ({...state, error})),
);
