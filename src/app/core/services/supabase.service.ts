import {Injectable} from '@angular/core';
import {createClient, SignInWithOAuthCredentials, SupabaseClient} from '@supabase/supabase-js';
import {environment} from '../../../environments/enviroment';
import {Product} from './product.service';
import {decode} from 'base64-arraybuffer';
@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  public supabase: SupabaseClient;
  private discord_auth_cb_url = environment.supabaseUrl;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
  }

  async authWithDiscord() {
    const credentials: SignInWithOAuthCredentials = {
      provider: 'discord',
    };

    const {data, error} = await this.supabase.auth.signInWithOAuth({
      provider: 'discord',
    });
  }

  /**
   * Tests access to a specified table in Supabase and logs the result.
   *
   * @param {string} table - The name of the table to access in Supabase.
   * @returns {Promise<any>} The data from the table if successful, or an error object if the access fails.
   */
  async testAccessToTable(table: string) {
    const {data, error} = await this.supabase.from(table).select();

    if (error) {
      console.log('error', error);
      return error;
    }
    console.log('data', data);
    return data;
  }

 

  logOutFromDiscord() {
    this.supabase.auth.signOut();
    this.supabase.auth
  }
  getSession() {
    this.supabase.auth.getSession();
  }


  getSupabaseToken(): string | null {
    const urlParts = this.discord_auth_cb_url.split('.');
    const ref = urlParts.length > 2 ? urlParts[0].replace('https://', '') : '';
    const tokenKey = `sb-${ref}-auth-token`;
    const token = localStorage.getItem(tokenKey);
    return token;
    
  }

  async saveProduct(product: Product): Promise<void> {
    const {data, error} = await this.supabase.from('products').insert({
      category: product.category,
      name: product.name,
      color_name: product.color_name,
      color_hex: product.color_hex,
      currency: product.currency,
      description: product.description,
      sizes: product.sizes,
      images: product.images,
    });

    if (error) {
      console.error('Error saving product:', error);
      return;
    }

    console.log('Product saved:', data);
  }

  async getProducts(): Promise<Product[]> {
    const {data, error} = await this.supabase.from('products').select('*');

    if (error) {
      console.error('Error getting products:', error);
      return [];
    }
    const sortById = (a: Product, b: Product) => a.id - b.id;

    return data.sort(sortById);
  }

  async getProduct(id: number) {
    const {data, error} = await this.supabase.from('products').select('*').eq('id', id);

    if (error) {
      console.error('Error getting products:', error);
      return {} as Product;
    }

    return data[0] || ({} as Product);
  }

  // storage get bucket nane: kalnins-merch
  async uploadImage(file: File): Promise<string> {
    const {data, error} = await this.supabase.storage.from('kalnins-merch').upload(`${file.name}`, file);

    if (error) {
      console.error('Error uploading image:', error);
      return '';
    }
    console.log('Image uploaded:', data);
    return data.path;
  }
}
