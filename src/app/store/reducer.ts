import { createFeatureSelector, createReducer } from '@ngrx/store';
import { Family, Purchase, User } from 'src/app/_models';

export interface State {
  family: Family;
  purchases: Purchase[];
  user: User;
  isLoggedIn: boolean;
}

export const initialState: State = {
  family: null,
  purchases: [],
  user: null,
  isLoggedIn: false,
};

export const familyFinanceReducer = createReducer(initialState);
