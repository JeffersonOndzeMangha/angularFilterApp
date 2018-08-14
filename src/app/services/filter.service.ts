import { Injectable, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Importing the JSON data from the files, JSON typings included in the root directory as to not use Http GET request, but can be implemented
import * as uniData from "../data/departments.json";
import * as students from "../data/students.json";

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  //Initial variables to store data and Filter Options
  departments:any = [];
  filterP:any = {};
  students:Array<any>;

  constructor(private route: ActivatedRoute) {
    //Implementing method calls when Service is constructed, similar to using ngOnInit()
    this.departments = this.getDepartements();
    this.students = this.getStudents();
    this.filterP = this.parseRoute();
  }


  //Transform JSON data from json documents into Javascript JSON Objects
  getDepartements(){
    return JSON.parse(JSON.stringify(uniData)).departments;//
  }
  getStudents(){
    return JSON.parse(JSON.stringify(students)).body.studentData.students;
  }

  //parseRoute() Parsing queryParameters so that filters can remain intact even on page refresh 'holding filter state'
  parseRoute(){
    this.route.queryParams.subscribe(params=>{
      if(params && params.department){
        let departmentName = params.department;
        let subject = params.subject.replace(/>/g, ' ');
        let dpt = this.getDepartement(departmentName);
        this.filterP = this.filter(dpt, subject);
        this.filterP.filterStudents = this.filterP.filterStudents;
      }else {
        this.filterP = this.filter();
        this.filterP.filterStudents = this.filterP.filterStudents;
      }
    });
    return this.filterP;
  }

  //return the department name back to normal from the cleaned string by the cleanUrls Pipe to match JSON data
  getDepartement(department){
    let dtpname = department.replace(/>/g, ' ');
    for(var i = 0; i<this.departments.length; i++){
      if(this.departments[i].name == dtpname){
        return this.departments[i];
      }
    }
  }

  //filtering by departements and subject- will update filter options to return to the header
  filter(department?, subject?){
    
    if(department && subject){
      var filteredStudents:Array<any> = [];
      for(var i = 0; i <this.students.length; i++){//Actual filtering Job, loops through array of students maching with filter options
        if(this.students[i].department == department.name && this.students[i].subject == subject){
          filteredStudents.push(this.students[i]);
        }
      }
      //Shifts the array of subjects putting the requested one first to update filter options
      department.subjects.splice(department.subjects.indexOf(subject), 1);
      department.subjects.unshift(subject);
      //sets new filte roptions
      this.filterP.filterOptions.department = department;
      this.filterP.filterStudents = filteredStudents;
      //emits an event which is subscribed to by the FilterView Component to update the view with the correct students
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



  @Output()
  filterActivated: EventEmitter<any> = new EventEmitter<any>();
}
