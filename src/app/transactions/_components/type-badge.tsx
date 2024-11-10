import { Badge } from "@/app/_components/ui/badge";
import { Transaction, TransactionType } from "@prisma/client";
import { CircleIcon } from "lucide-react";

interface TransactionTypeBadgeProps {
  transaction: Transaction;
}

export default function TransactionTypeBadge({
  transaction,
}: TransactionTypeBadgeProps) {
  if (transaction.type === TransactionType.DEPOSIT) {
    return (
      <Badge className="bg-muted text-primary hover:bg-muted font-bold">
        <CircleIcon className="fill-primary mr-1" size={10} />
        Depósito
      </Badge>
    );
  }
  if (transaction.type === TransactionType.EXPENSE) {
    return (
      <Badge className="text-danger bg-danger bg-opacity-15 hover:bg-danger hover:bg-opacity-15 font-bold">
        <CircleIcon className="fill-danger mr-1" size={10} />
        Despesa
      </Badge>
    );
  }
  if (transaction.type === TransactionType.INVESTMENT) {
    return (
      <Badge className="bg-muted text-secondary hover:bg-muted font-bold">
        <CircleIcon className="fill-white mr-1" size={10} />
        Investimento
      </Badge>
    );
  }
}
