import {Component} from '@angular/core';

@Component({
  selector: 'app-toolbar',
  template: `
    <!-- toolbar full wifth   one row hight contains loggin account menu-->
    <div
      class="w-full h-16 fixed hover:z-50 flex items-center
     "
    >
      <ng-content> </ng-content>
    </div>
  `,
  styles: ``,
})
export class ToolbarComponent {}
