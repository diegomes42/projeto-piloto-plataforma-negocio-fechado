import { createClient } from "@supabase/supabase-js";

// Credenciais públicas do projeto Módulo Obras (efslevhgyvgilceuhidb)
// Estas chaves são seguras para exposição no frontend, pois o acesso aos dados
// é controlado pelas políticas de Row Level Security (RLS) no banco de dados.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://efslevhgyvgilceuhidb.supabase.co";
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_ufDrxE2xHfCr9_wV_Cvacg_VDlyOGMW";

export const supabase = createClient(supabaseUrl, supabasePublishableKey);
