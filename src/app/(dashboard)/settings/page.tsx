import Account from "./components/Account";

import { createClient } from "@/utils/supabase/server";

export default async function SettingsPage() {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    return (
        <div>
            <Account user={data.user} />
        </div>
    );
}