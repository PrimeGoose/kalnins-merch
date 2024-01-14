import {Injectable} from '@angular/core';
import {createClient, SignInWithOAuthCredentials, SupabaseClient} from '@supabase/supabase-js';
import {environment} from '../../../environments/enviroment';
import {Product} from '../models/product.model';
@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  public supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
  }

  async authWithDiscord(): Promise<SignInWithOAuthCredentials | any> {
    const {data, error} = await this.supabase.auth.signInWithOAuth({
      provider: 'discord',
    });
    if (error) {
      return error;
    }
    return data;
  }

  async getStoreManagerService() {
    const {data, error} = await this.supabase.from('store_managers').select('*');
    if (error) {
      return [];
    }
    return [...data];
  }

  async getUserService(): Promise<any> {
    const {data, error} = await this.supabase.auth.getUser();
    if (error) {
      return 'no user';
    } else {
      return data.user.id;
    }
  }

  async getIsStoreManager(): Promise<boolean> {
    let isManager = false;
    let usr_id: any = await this.getUserService();

    await this.getStoreManagerService().then((data) => {
      data.filter((manager: any) => {
        if (manager.user_id == usr_id) {
          isManager = true;
        }
      });
    });
    return isManager;
  }

  logOutService() {
    this.supabase.auth.signOut();
  }
  getSessionService() {
    this.supabase.auth.getSession();
  }

  async getAllProductsService(): Promise<Product[]> {
    const {data, error} = await this.supabase.from('products').select('*');

    if (error) {
      console.error('Error getting products:', error);
      return [] as Product[];
    }
    const sortById = (a: Product, b: Product) => a.product_id - b.product_id;

    return [...data.sort(sortById)] as Product[];
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
