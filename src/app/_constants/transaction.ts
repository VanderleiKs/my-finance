import { TransactionType } from "@prisma/client";

type OptionType = {
  value: string;
  label: string;
};

export const TRANSACTION_CATEGORY_LABELS: { [key: string]: string } = {
  HOUSING: "Habitação",
  TRANSPORTATION: "Transporte",
  FOOD: "Alimentação",
  ENTERTAINMENT: "Entretenimento",
  HEALTH: "Saúde",
  UTILITY: "Utilidade",
  SALARY: "Salário",
  EDUCATION: "Educação",
  OTHER: "Outro",
};

export const TRANSACTION_PAYMENT_METHOD_LABELS: { [key: string]: string } = {
  CREDIT_CARD: "Cartão de crédito",
  DEBIT_CARD: "Cartão de débito",
  BANK_TRANSFER: "Transferência bancária",
  BANK_SLIP: "Boleto bancário",
  CASH: "Dinheiro",
  PIX: "Pix",
  OTHER: "Outro",
};

export const TRANSACTION_TYPE_OPTIONS = [
  {
    value: TransactionType.DEPOSIT,
    label: "Depósito",
  },
  {
    value: TransactionType.EXPENSE,
    label: "Despesa",
  },
  {
    value: TransactionType.INVESTMENT,
    label: "Investimento",
  },
];

export const OPTIONS_CATEGORY: OptionType[] = Object.keys(
  TRANSACTION_CATEGORY_LABELS,
).map((K) => {
  return { value: K, label: TRANSACTION_CATEGORY_LABELS[K] };
});

export const OPTIONS_PAYMENT_METHOD: OptionType[] = Object.keys(
  TRANSACTION_PAYMENT_METHOD_LABELS,
).map((K) => {
  return { value: K, label: TRANSACTION_PAYMENT_METHOD_LABELS[K] };
});
