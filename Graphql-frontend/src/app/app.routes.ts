import { Routes } from '@angular/router';
import { ApolloGraphqlComponent } from './components/apollo-graphql/apollo-graphql.component';

export const routes: Routes = [  
  {
    path: '',
    redirectTo: '/apollo', // Redirect to the 'pricing' route
    pathMatch: 'full',
  },
  {
    path: 'apollo',
    component: ApolloGraphqlComponent,
  },
  

];
