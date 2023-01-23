//import { HandlerService } from './../handler.service';
import { Component, OnInit } from '@angular/core';

import {HttpClient} from '@angular/common/http';
//Access-Control-Allow-Origin: *

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {

  constructor(private http:HttpClient) { }

//  console.log("called")
api_data:any=[]

  get_start_point(value:string){
    //console.log(value)
  
     this.http.get('http://localhost:5000/vehicle/read').subscribe((data:any)=>
     {
      console.log("send to api ",value)
this.api_data=data;
      console.log(data);

    });
    // console.log(value)
    // console.log("called")
 

//    this.users=this.data;
    
  }

  get_stop(value:string){
    console.log(value) 
  }

  ngOnInit(): void {
  }

}
