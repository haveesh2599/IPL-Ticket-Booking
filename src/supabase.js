import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://oknrinupmubsfsgmqdub.supabase.co";
const supabaseKey = "sb_publishable_qi-gEjGmI7xwSuLdtmKGHA_tRVFPDGf";

export const supabase = createClient(
    supabaseUrl,
    supabaseKey
);
