import { Component, OnInit } from '@angular/core';
import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-filterview',
  templateUrl: './filterview.component.html',
  styleUrls: ['./filterview.component.css']
})
export class FilterviewComponent implements OnInit {
  students:any =[];

  constructor(private filterService: FilterService) {
    this.students = this.filterService.filterP.filterStudents;
    this.filterService.filterActivated.subscribe((res:any) =>(this.students = res, console.log(this.students)));
  }

  ngOnInit() {
  }

}
