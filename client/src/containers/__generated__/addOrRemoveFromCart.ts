/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addOrRemoveFromCart
// ====================================================

export interface addOrRemoveFromCart_addOrRemoveFromCart {
  __typename: "Launch";
  id: string;
}

export interface addOrRemoveFromCart {
  addOrRemoveFromCart: (addOrRemoveFromCart_addOrRemoveFromCart | null)[] | null;
}

export interface addOrRemoveFromCartVariables {
  launchId: string;
}
