import { Component } from '@angular/core';
import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-filterview',
  templateUrl: './filterview.component.html',
  styleUrls: ['./filterview.component.css']
})
export class FilterviewComponent {
  students:any =[];

  constructor(private filterService: FilterService) {
    this.students = this.filterService.filterP.filterStudents;
    //subscribes to the filterActivated event, which is triggered when new filters are selected by the filterService
    this.filterService.filterActivated.subscribe((res:any) =>(this.students = res, console.log(this.students)));
  }

}
