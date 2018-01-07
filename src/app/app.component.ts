import { Component, ViewContainerRef } from '@angular/core';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';

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
  public show:boolean = false;

  constructor(private _articleService: ArticleService,public modal: Modal) {
    this._articleService.getUsers({name: this.articleName}).subscribe(res => { this.articles = res.hits , this.totalNumber = res.total });
  }

  onClick(article) {
    const dialogRef = this.modal.alert()
        .size('lg')
        .showClose(true)
        .title(article._source.title)
        .body(article._source.body)
        .open();

    dialogRef.result.then( result => console.log(`The result is: ${result}`) );
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


