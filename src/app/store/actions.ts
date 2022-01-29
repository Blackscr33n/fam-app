import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Login Page] Login',
  props<{ username: string; password: string }>()
);

export const register = createAction(
  '[Register Page] Register',
  props<{ username: string; password: string }>()
);
