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
  defaultPageNo: number = 1;
  itemsPerPage : number = 20;
  totalNumber: number;

  constructor(private _articleService: ArticleService) {
    this._articleService.getUsers({name: this.articleName}).subscribe(res => { this.articles = res.hits , this.totalNumber = res.total });
  }

  searchArticles(currentPageNumber: number){
    this.defaultPageNo = currentPageNumber;
    console.log('current page number is', currentPageNumber);
  	if(!this.articleName){
  		return;
  	}
  	console.log('Search string = ' + this.articleName);
  	this._articleService.getUsers({name: this.articleName, pageNumber : currentPageNumber}).subscribe(res =>  { this.articles = res.hits , this.totalNumber = res.total
  });
  }

   ngOnInit() {
        this.searchArticles(1);
    }

}
