
/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Environment variables
  readonly VITE_APP_VERSION: string;
  readonly VITE_PUBLIC_URL: string;
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
