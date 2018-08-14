import { Component } from '@angular/core';

import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  hide:boolean = true;
  showAll:boolean = false;
  departments:Array<any> = [];
  filterOptions:any;
  toolTip:any;

  constructor(public filterService:FilterService) { 
    this.filterOptions = this.filterService.filterP.filterOptions;
    this.departments = this.filterService.getDepartements();
  }
  //activates filters, this triggers the filterService.filter function, in turn emitting a new filterActivated event which updates the FilterView Component
  activateFilter(department, subject){
    let response = this.filterService.filter(department, subject);
    this.filterOptions = response.filterOptions;
    this.showAll = false;
  }
  //resets filters back to all departments and subjects, triggers the filterService.filter function with no queryParameters
  reset(){
    this.filterOptions = this.filterService.filter().filterOptions;
    this.showAll = false;
  }

}
