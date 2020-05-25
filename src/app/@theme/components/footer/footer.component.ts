import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created with ♥ by <b><a href="https://www.linkedin.com/in/michaelmadume/" target="_blank">Sudo_Mich</a></b>
      {{today | date: 'yyyy'}}
    </span>
    <div class="socials">
      <a href="https://twitter.com/Sudo_Mich" target="_blank" class="ion ion-social-twitter"></a>
      <a href="https://github.com/MichaelMadume" target="_blank" class="ion ion-social-github"></a>
      <a href="https://www.linkedin.com/in/michaelmadume/" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
  today = Date.now();
}
