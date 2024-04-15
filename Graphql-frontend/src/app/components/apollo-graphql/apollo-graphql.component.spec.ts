import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApolloGraphqlComponent } from './apollo-graphql.component';

describe('ApolloGraphqlComponent', () => {
  let component: ApolloGraphqlComponent;
  let fixture: ComponentFixture<ApolloGraphqlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApolloGraphqlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApolloGraphqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
