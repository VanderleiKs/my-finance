import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { DataTable } from "../_components/ui/data-table";
import { db } from "../_lib/prisma";
import { transactionsColumns } from "./_columns";

export default async function TransactionPage() {
  const transactions = await db.transaction.findMany({});

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between w-full items-center">
        <h1 className="text-2xl font-bold">Transações</h1>
        <Button className="rounded-full">
          Adicionar transação <ArrowDownUpIcon />
        </Button>
      </div>
      <h1 className="text-red-500 text-4xl flex w-full justify-center">
        Transações
      </h1>

      <DataTable columns={transactionsColumns} data={transactions} />
    </div>
  );
}
