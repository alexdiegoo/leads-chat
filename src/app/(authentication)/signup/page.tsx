import { Input } from "@/app/ui/Input";

import { signup } from "./actions";
import Link from "next/link";

export default function SignUpPage() {
    return (
        <div className='w-full max-w-md flex flex-col items-center gap-6 p-10 border border-gray-200 rounded-2xl shadow-lg'>
            <h1 className="text-2xl font-bold mb-6">Criar conta</h1>
            <form className="flex flex-col gap-4">
                <Input 
                    id="email"
                    name="email"
                    label="Email" 
                    type="email" 
                    placeholder="seu@email.com" 
                    required />
                <Input 
                    id="password"
                    name="password"
                    label="Senha" 
                    type="password" 
                    placeholder="Sua senha" 
                    required />
                <button
                    formAction={signup}
                    className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                >
                    Criar conta
                </button>
            </form>
            <p className="text-center text-sm text-purple-600 mt-4"> 
                <Link href="/login">Já possui uma conta? Faça login</Link>
            </p>
        </div>
    );
}