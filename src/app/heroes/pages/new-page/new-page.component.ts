import { Component } from '@angular/core';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.scss'],
})
export class NewPageComponent {
  public publuhers = [
    {
      id: 'Marvel Comics',
      text: 'Marvel-Comics',
    },
    {
      id: 'DC Comics',
      text: 'DC-Comics',
    },
  ];
}
