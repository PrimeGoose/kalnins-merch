import {Component} from '@angular/core';

@Component({
  selector: 'app-toolbar',
  template: `
    <!-- toolbar full wifth   one row hight contains loggin account menu-->
    <ng-content> </ng-content>
  `,
  styles: ``,
})
export class ToolbarComponent {}
