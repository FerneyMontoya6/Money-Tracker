import { LabelAndValue } from "src/types";

export const iconsNavigationBar: Record<string, string> = {
  HomeTab: "home",
  CategoriesTab: "category",
  AccountsTab: "account-balance-wallet",
};

export const bankingEntities: LabelAndValue[] = [
  {
    label: "Bancolombia",
    value: "1",
  },
  {
    label: "Nequi",
    value: "2",
  },
  {
    label: "Daviplata",
    value: "3",
  },
];

export const typesOfAccounts: LabelAndValue[] = [
  {
    label: "Efectivo",
    value: "1",
  },
  {
    label: "Corriente",
    value: "2",
  },
  {
    label: "Crédito",
    value: "3",
  },
];
