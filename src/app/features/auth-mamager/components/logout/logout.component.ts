import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import { SupabaseService } from '../../../../core/services/supabase.service';

@Component({
  selector: 'app-logout',
  template: `
  <!-- logout of discord -->
  <button
    class="bg-slate-900 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
    (click)="logout()"
  >
  
  `,
  styles: ``,
})
export class LogoutComponent {

  constructor(
    private supabase: SupabaseService
  ) { }
  

  logout() {
    this.supabase.logOutFromDiscord();
  }
}
