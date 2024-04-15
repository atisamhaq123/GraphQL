// app.module.ts

import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryCache } from '@apollo/client/core';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { ApolloGraphqlComponent } from './components/apollo-graphql/apollo-graphql.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        AppComponent,
        ApolloGraphqlComponent,
    ],
    providers: [
        {
          provide: APOLLO_OPTIONS,
          useFactory(httpLink: HttpLink) {
            return {
              cache: new InMemoryCache(),
              link: httpLink.create({
                uri: 'http://localhost:4000',
              }),
            };
          },
          deps: [HttpLink],
        },
      ],
    bootstrap: [AppComponent],
    imports: [BrowserModule, ApolloModule, HttpClientModule, RouterModule.forRoot(routes),SharedModule,FormsModule],

})
export class AppModule { }
