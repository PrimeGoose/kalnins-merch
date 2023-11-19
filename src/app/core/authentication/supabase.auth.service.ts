import {Injectable} from '@angular/core';
import {createClient, SignInWithOAuthCredentials, SupabaseClient} from '@supabase/supabase-js';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseAuthService {
  private supabase: SupabaseClient;
  private discord_auth_cb_url = environment.supabaseUrl;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
  }

  async loginWithDiscord() {
    const credentials: SignInWithOAuthCredentials = {
      provider: 'discord',
    };

    const {data, error} = await this.supabase.auth.signInWithOAuth({
      provider: 'discord',
    });
  }

  getSupabaseToken(): string | null {
    const urlParts = this.discord_auth_cb_url.split('.');
    const ref = urlParts.length > 2 ? urlParts[0].replace('https://', '') : '';
    const tokenKey = `sb-${ref}-auth-token`;
    const token = localStorage.getItem(tokenKey);
    return token;
  }
}
