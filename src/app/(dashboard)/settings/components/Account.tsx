'use client';

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function Account({ user }: { user: any }) {
    const supabase = createClient();
    const router = useRouter();

    const handleLogout = async () => {
        console.log('Logging out...');
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error logging out:', error);
        }

        router.push('/login');
    };

    return (
        <div className='w-full max-w-3xl p-6 bg-white rounded-lg shadow-md'>
            <h1 className="text-2xl font-bold mb-6">Configurações da Conta:</h1>
            <p>Aqui você pode ver e ajustar suas preferências e configurações.</p>
            <p>Email: {user?.email}</p>

            <div className='mt-4 w-28 p-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-red-200 transition flex items-center gap-2'
                onClick={handleLogout}>
               <span className='text-red-600'>Desconectar</span>
            </div>
        </div>
    );
}