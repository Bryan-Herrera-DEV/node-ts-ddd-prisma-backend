export const enum operatorEnum {
  "EQUAL" = "EQUAL",
}

export interface Filter<T> {
  field: keyof T;
  value: string;
  operator: operatorEnum;
}

export interface CriteriaRequest<T> {
  criteria: Filter<T>[]
}
