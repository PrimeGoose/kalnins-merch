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

  async getStoreManagerService() {
    const {data, error} = await this.supabase.from('store_managers').select('*');
    if (error) {
      return [];
    }
    console.log('store manager data', [...data]);
    return [...data];
  }

  async getUserService(): Promise<any> {
    const {data, error} = await this.supabase.auth.getUser();
    if (error) {
      return error;
    }
    return data;
  }

  async getIsStoreManager(): Promise<boolean> {
    let isManager = false;
    let user: any;
    await this.getUserService().then((data) => {
      console.log('user', data?.user?.product_id);
      user = data.user;
    });

    await this.getStoreManagerService().then((data) => {
      data.filter((manager: any) => {
        if (manager.user_id === user?.product_id) {
          isManager = true;
        }
      });
    });

    return isManager;
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
      return error;
    }
    return data;
  }

  logOutFromDiscord() {
    this.supabase.auth.signOut();
    this.supabase.auth;
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
  }

  async getProducts(): Promise<Product[]> {
    const {data, error} = await this.supabase.from('products').select('*');

    if (error) {
      console.error('Error getting products:', error);
      return [];
    }
    const sortById = (a: Product, b: Product) => a.product_id - b.product_id;

    return data.sort(sortById);
  }

  async getProduct(id: number) {
    const {data, error} = await this.supabase.from('products').select('*').eq('product_id', id);

    if (error) {
      console.error('Error getting products:', error);
      return {} as Product;
    }

    return data[0] || ({} as Product);
  }

  // storage get bucket nane: kalnins-merch
  async uploadImage(file: File, bucketId: string): Promise<Object> {
    const {data, error} = await this.supabase.storage.from(`${bucketId}`).upload(`${file.name}`, file);
    console.log('data', data);

    if (error) {
      console.error('Error uploading image:', error);
      return {
        path: '',
        url: '',
      };
    }
    return {
      path: data.path,
      url: `https://islbmwzkwwjkjvbsalcp.reysweek.com/storage/v1/object/public/${bucketId}/${data.path}`,
    };
  }
}
