import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SupabaseService} from '../../../../core/services/supabase.service';

@Component({
  standalone: true,
  selector: 'app-logout',
  template: `
    <!-- logout of discord -->
    <button class="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded  block" (click)="logout()">log out</button>
  `,
  styles: ``,
})
export class LogoutComponent {
  constructor(private supabase: SupabaseService) {}

  async logout() {
    await this.supabase.logOutFromDiscord();

  }
}
