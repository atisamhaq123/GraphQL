/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module'; // Import AppModule
console.warn = () => {};
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
