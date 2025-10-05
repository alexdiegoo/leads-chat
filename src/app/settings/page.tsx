import { createClient } from '@/utils/supabase/server'

export default async function SettingsPage() {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Configurações da Conta:</h1>
            <p>Aqui você pode ver e ajustar suas preferências e configurações.</p>
            <p>Email: {data.user?.email}</p>
        </div>
    );
}