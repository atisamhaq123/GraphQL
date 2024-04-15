import { Component,ElementRef,ViewChild} from '@angular/core';
import { Apollo, gql } from 'apollo-angular';



@Component({
  selector: 'app-apollo-graphql',
  standalone: false,
  templateUrl: './apollo-graphql.component.html',
  styleUrl: './apollo-graphql.component.scss'
})
export class ApolloGraphqlComponent{
  @ViewChild('dialog_box') dialog_box: ElementRef;
  games: any[];
  authors: any[];
  reviews:any[];
  loading = true;
  error: any;
  editable=false;
  current_table="";
  entry_id:string;
  entry1="";
  entry1_header="";
  entry2="";
  entry2_header="";
  fields:any={}
  mode:number=0 //for update
  show:boolean=false;
  queries= `
  {
    games {
      id
      platform
      title
      reviews {
        content
        rating
      }
    }
    authors{
      id
      name
      verified
    }
    reviews {
      id
      rating
      content

    }
  }
`
CHANGE_AUTHOR_TABLE  = gql`
mutation updateAuthor($id:ID!, $edits: UpdateAuthorInput){
  updateAuthor(id: $id, edits: $edits) {
    id
    name
    verified
  }
}`
CHANGE_GAME_TABLE = gql`
mutation updateMutation($id: ID!, $edits: UpdateGameInput!) {
  updateGame(id: $id, edits: $edits) {
    id
    title
    platform
    reviews {
      id
      rating
      content

    }
  }
}`
CHANGE_REVIEW_TABLE = gql`
mutation updateReview($id: ID!, $edits: UpdateReviewInput){
  updateReview(id: $id, edits: $edits) {
    id
    rating
    content
  }
}`
DELETE_GAME_QUERY = gql`
mutation deleteMutation($id: ID!){
  deleteGame(id: $id) {
    id
    title
    platform
    reviews {
      id
      rating
      content

    }
  }
}`
DELETE_REVIEW_QUERY = gql`
mutation deleteMutation($id: ID!){
  deleteReview(id: $id) {
    id
    rating
    content
  }
}`
DELETE_AUTHOR_QUERY = gql`
mutation deleteMutation($id: ID!){
  deleteAuthor(id: $id) {
    id
    name
    verified
  }
}`
ADD_AUTHOR_TABLE  = gql`
mutation addMutation($author: AddAuthorInput){
  addAuthor(author:$author) {
    id
    name
    verified
  }
}`

  constructor(private apollo: Apollo) {}
 
  ngOnInit() {
   this.fetchData()
  }

 
  fetchData(): void {
    this.apollo
      .watchQuery({
        query: gql`${this.queries}`
      })
      .valueChanges
      .subscribe({
        next: (result: any) => {
          this.games = result.data?.games;
          this.reviews = result.data?.reviews;
          this.authors = result.data?.authors;
          this.loading = result.loading;
          this.error = result.error;
          console.log("Server response:", result.data?.games);
          // Perform any additional logic after data has been updated
        },
        error: (error) => {
          console.error("Error:", error);
        }
      });
  }
 
 
  preProcessValues(id:any,table_name:String){
    this.mode=0; //for update
    this.fields={}
    this.entry_id=id
    if (table_name=="games"){
      this.editable=false
      this.current_table="games"
      this.entry1_header="Title"
      this.entry2_header="Platform"
      this.games.map((obj)=>{
        if (obj.id==id){
          this.entry1=obj.title
          this.entry2=obj.platform
        }
      })
    }
    else if (table_name=="authors"){
      this.editable=false
      this.current_table="authors"
      this.entry1_header="Name"
      this.entry2_header="Verified"
      this.authors.map((obj)=>{
        if (obj.id==id){
          this.entry1=obj.name
          this.entry2=obj.verified
        }
      })
    }
    else if (table_name=="reviews"){
      this.editable=false
      this.current_table="reviews"
      this.entry1_header="Rating"
      this.entry2_header="Content"
      this.reviews.map((obj)=>{
        if (obj.id==id){
          this.entry1=obj.rating
          this.entry2=obj.content
        }
      })
    }
    this.dialog_box?.nativeElement.classList.remove("close");
   
  }
  PerformMutation(id:string,fields:any){
    if (this.mode==1){
   
      this.fields["name"] = this.entry1;
      this.fields["verified"] = Boolean(this.entry2);
      this.apollo
      .mutate({
        mutation: this.ADD_AUTHOR_TABLE,
        variables: {
          author: fields
        },
      })
      .subscribe({
        next: (response) => {
          this.authors=Object(response).data?.addAuthor
          this.closeModal()
          
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
    }
    else{
      if (this.current_table=="games"){
        this.fields["title"]=this.entry1
        this.fields["platform"]=this.entry2
       
        this.apollo
        .mutate({
          mutation: this.CHANGE_GAME_TABLE,
          variables: {
            id: id,
            edits: fields
          }
        })
        .subscribe({
          next: (response) => {
            this.games=Object(response).data?.updateGame
            this.closeModal()
          },
          error: (error) => {
            console.error('Error:', error);
          }
        });
      }
      else if (this.current_table=="authors"){
        this.fields["name"] = this.entry1;
        this.fields["verified"] = Boolean(this.entry2);
  
        this.apollo
        .mutate({
          mutation: this.CHANGE_AUTHOR_TABLE,
          variables: {
            id: id,
            edits: fields
          }
        })
        .subscribe({
          next: (response) => {
            this.authors=Object(response).data?.updateAuthor
            this.closeModal()
          },
          error: (error) => {
            console.error('Error:', error);
          }
        });
      }
      else if (this.current_table=="reviews"){
        this.fields["rating"] = parseInt(this.entry1);
        this.fields["content"] = this.entry2;
  
        this.apollo
        .mutate({
          mutation: this.CHANGE_REVIEW_TABLE,
          variables: {
            id: id,
            edits: fields
          }
        })
        .subscribe({
          next: (response) => {
            this.reviews=Object(response).data?.updateReview
            this.closeModal()
          },
          error: (error) => {
            console.error('Error:', error);
          }
        });
  
      }
    }
  
       
  }

  deleteMutation(event:MouseEvent,id:string,current_table:string){
    event.stopPropagation();
    if (current_table=="games"){
      this.apollo
      .mutate({
        mutation: this.DELETE_GAME_QUERY,
        variables: {
          id: id
        },
      
      })
      .subscribe({
        next: (response) => {
          this.games=Object(response).data?.deleteGame
          
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
  
    }
    else if (current_table=="authors"){
      this.apollo
      .mutate({
        mutation: this.DELETE_AUTHOR_QUERY,
        variables: {
          id: id
        }, 
      })
      .subscribe({
        next: (response) => {
          this.authors=Object(response).data?.deleteAuthor
        },
        error: (error) => {
          console.error("Error:", error);
        }
      });
    }
    else if (current_table=="reviews"){
      this.apollo
      .mutate({
        mutation: this.DELETE_REVIEW_QUERY,
        variables: {
          id: id
        }, 
      })
      .subscribe({
        next: (response) => {
          this.reviews=Object(response).data?.deleteReview
          
        },
        error: (error) => {
          console.error("Error:", error);
        }
      });
    }

  }
  addAuthor(){
    this.entry1_header="Name"
    this.entry2_header="Verified"
    this.mode=1;
    this.fields={}
    this.dialog_box?.nativeElement.classList.remove("close");
  }
  closeModal(){
    this.dialog_box?.nativeElement.classList.add("close");
  }
  reveal(){
    this.show=!this.show
  }
}
