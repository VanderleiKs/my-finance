import { NumericFormat, NumericFormatProps } from "react-number-format";
import { Input } from "./input";
import React from "react";

export default function MoneyInput(
  props: NumericFormatProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  return (
    <NumericFormat
      {...props}
      thousandSeparator="."
      decimalSeparator=","
      prefix="R$"
      allowNegative={false}
      decimalScale={2}
      customInput={Input}
      getInputRef={ref}
    />
  );
}
