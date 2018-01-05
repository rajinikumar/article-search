import { Component } from '@angular/core';
import { ArticleService } from './article.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  articles : Array<any>;
  articleName : String;
  p: number = 1; //current page number set to 1
/*  loading: boolean;*/
  totalNumber: number;

  constructor(private _articleService: ArticleService) {
  //this.articles = [{"headline" : "Article 1" , "editor" : "rajini", "body" : "<p>test</p>"},{"headline" : "Article 2" , "editor" : "http://abcd.com", "body" : "<p>test</p>"},{"headline" : "Article 3" , "editor" : "http://abcd.com", "body" : "<p>test</p>"},{"headline" : "Article 4" , "editor" : "http://abcd.com", "body" : "<p>test</p>"}];
    //this._articleService.getUsers().subscribe(res => this.articles = res);
    this._articleService.getUsers({name: this.articleName}).subscribe(res => { this.articles = res.hits , this.totalNumber = res.total });
  }

  searchArticles(currentPageNumber: number){

/*  	console.log(this.articles);*/
/*    this.loading = true;*/
    this.p = currentPageNumber;
    console.log('current page number is', currentPageNumber);
    /*this.totalNumber = this.articles.length;
    console.log(this.articles.length);*/
/*    this.loading = false;*/


  	if(!this.articleName){
  		return;
  	}
  	console.log('Search string = ' + this.articleName);
  	this._articleService.getUsers({name: this.articleName, pageNumber : currentPageNumber}).subscribe(res =>  { this.articles = res.hits , this.totalNumber = res.total });
  }

   ngOnInit() {
        this.searchArticles(1);
    }

}
