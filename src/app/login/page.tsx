import { SignInButton } from "@clerk/nextjs";
import { Button } from "../_components/ui/button";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const { userId } = await auth();
  if (userId) redirect("/");
  return (
    <>
      <div className="grid grid-cols-2">
        <div className="flex flex-col gap-3 justify-center w-[488px] mx-auto">
          <Image src="/logo.svg" width={174} height={39} alt="logo" />
          <h1 className="mt-4 text-3xl font-bold">Bem-vindo</h1>
          <p className="text-muted-foreground">
            A Finance AI é uma plataforma de gestão financeira que utiliza IA
            para monitorar suas movimentações, e oferecer insights
            personalizados, facilitando o controle do seu orçamento.
          </p>

          <SignInButton>
            <Button variant="outline">
              <Image src="/google.svg" width={20} height={20} alt="Google" />
              Entrar com o google
            </Button>
          </SignInButton>
        </div>
        <div className="relative h-screen w-full">
          <Image src="/login.png" fill className="object-cover" alt="login" />
        </div>
      </div>
    </>
  );
}
