import {createAction, props} from '@ngrx/store';
import {Product} from 'src/app/core/models/product.model';

export const loadProducts: any = createAction('[Product] Load Products');

export const loadProductsSuccess: any = createAction('[Product] Load Products Success', props<{items: Product[]}>());

export const loadProductsFailure: any = createAction('[Product] Load Products Failure', props<{error: any}>());
