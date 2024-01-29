import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {SupabaseService} from '../services/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Initialize a BehaviorSubject with null (assuming no user is logged in initially)
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>('');
  private isManagerSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private storeManagerSubject: BehaviorSubject<any> = new BehaviorSubject<any[]>([]);
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public user$: Observable<any> = this.userSubject.asObservable();
  public isManager$: Observable<boolean> = this.isManagerSubject.asObservable();
  public storeManager$: Observable<any> = this.storeManagerSubject.asObservable();
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  constructor(private db: SupabaseService) {
    this.getUser(); // Set the initial value on page load
    this.getStoreManager();
    this.getIsStoreManager();
  }

  private async getStoreManager() {
    const {data, error} = await this.db.supabase.from('store_managers').select('*');
    if (error) {
      return;
    } else {
      this.storeManagerSubject.next(data);
    }
  }

  private async getIsStoreManager(): Promise<boolean> {
    let isManager = false;
    let usr_id: any = '';
    this.user$.subscribe((data) => {
      // console.log(data.user?.id);
      usr_id = data.user?.id;
    });

    this.storeManager$.subscribe((data) => {
      data.filter((manager: any) => {
        if (manager.user_id == usr_id) {
          this.isManagerSubject.next(true);
        }
      });
    });

    return isManager;
  }

  private async getUser() {
    const {data, error} = await this.db.supabase.auth.getUser();

    // Update the BehaviorSubject with the new user data
    if (data) {
      this.userSubject.next(data);
    } else if (error) {
      console.error('Error fetching user:', error);
      this.userSubject.next(null); // Reset the user data in case of an error
    }
  }

  public async getIsAuthenticated() {
    const {data, error} = await this.db.supabase.auth.getSession();
    if (data?.session?.user.aud == 'authenticated') {
      this.isAuthenticatedSubject.next(true);
    } else if (error) {
      this.isAuthenticatedSubject.next(false);
    }
  }
}
