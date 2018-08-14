import { Injectable, EventEmitter, Output, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as uniData from "../data/departments.json";
import * as students from "../data/students.json";

@Injectable({
  providedIn: 'root'
})
export class FilterService implements OnInit {
  departments:any = [];
  filterP:any = {};
  students:Array<any>;

  constructor(private route: ActivatedRoute) {
    this.departments = this.getDepartements();
    this.students = this.getStudents();
    this.filterP = this.parseRoute();
  }

  ngOnInit(){
    
  }

  parseRoute(){
    this.route.queryParams.subscribe(params=>{
      if(params && params.department){
        let departmentName = params.department;
        let subject = params.subject.replace(/>/g, ' ');
        let dpt = this.getDepartement(departmentName);
        this.filterP = this.filter(dpt, subject);
        this.filterP.options = this.filterP.options;
        this.filterP.filterStudents = this.filterP.filterStudents;
      }else {
        this.filterP = this.filter();
        this.filterP.options = this.filterP.options;
        this.filterP.filterStudents = this.filterP.filterStudents;
      }
    });
    return this.filterP;
  }

  getDepartement(department){
    let dtpname = department.replace(/>/g, ' ');
    for(var i = 0; i<this.departments.length; i++){
      if(this.departments[i].name == dtpname){
        return this.departments[i];
      }
    }
  }

  getDepartements(){
    return JSON.parse(JSON.stringify(uniData)).departments;
  }

  getStudents(){
    return JSON.parse(JSON.stringify(students)).body.studentData.students;
  }

  @Output()
  filterActivated: EventEmitter<any> = new EventEmitter<any>();

  //filtering by departements and subject- will update filter options to return to the header
  filter(department?, subject?){
    //Shifts the array of subjects putting the requested one first to update filter options
    if(department && subject){
      var filteredStudents:Array<any> = [];
      for(var i = 0; i <this.students.length; i++){
        if(this.students[i].department == department.name && this.students[i].subject == subject){
          filteredStudents.push(this.students[i]);
        }
      }
      department.subjects.splice(department.subjects.indexOf(subject), 1);
      department.subjects.unshift(subject);
      this.filterP.filterOptions.department = department;
      this.filterP.filterStudents = filteredStudents;
      this.filterActivated.emit(filteredStudents);
    }else {
      this.filterP.filterOptions = {
        department: {
          name: "All Departments",
          subjects: ['All Subjects']
        }
      };
      this.filterP.filterStudents = this.students;
    }
    return this.filterP;
  }
}
