import { Component, OnInit } from '@angular/core';

import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  hide:boolean = true;
  styles:object = {};
  showAll:boolean = false;
  departments:Array<any> = [];
  filterOptions:any;
  subjectOptions: object = {
    show: [],
    hidden: []
  }
  t:any;
  toolTip:any;

  constructor(public filterService:FilterService) { 
    this.filterOptions = this.filterService.filterP.filterOptions;
  }

  ngOnInit() {
    this.departments = this.filterService.getDepartements();
  }
  activateFilter(department, subject){
    let response = this.filterService.filter(department, subject);
    this.filterOptions = response.filterOptions;
    this.showAll = false;
  }
  reset(){
    this.filterOptions = this.filterService.filter().filterOptions;
    this.showAll = false;
  }
  loaded(item){
    console.log(item);
  }

}
