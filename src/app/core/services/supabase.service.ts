import {Injectable, isDevMode} from '@angular/core';
import {createClient, PostgrestError, SignInWithOAuthCredentials, SupabaseClient} from '@supabase/supabase-js';
import {environment} from '../../../environments/enviroment';
import {Product} from '../models/product.model';

export function logPostgrestError(message: string, error: PostgrestError): void {
  console.error(`"${message}"
      ${error.message ? 'Message: ' + error.message : ''}
      ${error.hint ? 'Hint: ' + error.hint : ''}
      ${error.code ? 'Error code: ' + error.code : ''}
      ${error.details ? 'Details: ' + error.details : ''}
      `);
}
@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  public readonly supabase: SupabaseClient = createClient(environment.supabaseUrl, environment.supabaseAnonKey);

  async getRoyals(): Promise<string[]> {
    const {data, error} = await this.supabase.from('royals').select('name');

    if (error) {
      console.error('Error getting royals:', error);
      return [];
    }
    const result = data.map((royal: any) => royal.name);
    return result;
  }

  async authWithDiscord(): Promise<SignInWithOAuthCredentials | any> {
    let redirectTo = 'https://www.kalninsmerch.com';
    const redirectDev = 'http://localhost:4200';
    const redirectProd = 'https://www.kalninsmerch.com';

    if (isDevMode()) {
      redirectTo = redirectDev;
    } else {
      redirectTo = redirectProd;
    }
    const {data, error} = await this.supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: redirectTo,
      },
    });

    if (error) {
      console.error('Authentication error:', error);
      return error;
    }
    return data;
  }

  logOutService() {
    this.supabase.auth.signOut();
  }
  getSessionService() {
    this.supabase.auth.getSession();
  }

  async saveProductService(product: Product): Promise<void> {
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

  async getProductByIDService(id: number) {
    const {data, error} = await this.supabase.from('products').select('*').eq('product_id', id);

    if (error) {
      console.error('Error getting products:', error);
      return {} as Product;
    }

    return (
      data[0] ||
      ({
        sizes: [],
        product_id: 0,
        category: '',
        name: '',
        color_hex: '',
        color_name: '',
        currency: '',
        gender: '',
        brand: '',
        description: '',
        images: [],
      } as Product)
    );
  }

  // storage get bucket nane: kalnins-merch
  async uploadPublicImageServive(file: File, bucketId: string): Promise<Object> {
    const {data, error} = await this.supabase.storage.from(`${bucketId}`).upload(`${file.name}`, file);

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
