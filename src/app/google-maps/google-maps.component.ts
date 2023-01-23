import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  
  lat = 41.882135;

  //lat = 51.678418;
  long = -87.62574;



}
