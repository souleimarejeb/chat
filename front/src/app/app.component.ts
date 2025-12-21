import { Component, OnInit } from '@angular/core';
import { Test, TestService } from './services/test-service/test.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'front';

  testValue:Observable<Test> = this.service.getTest();
  

  constructor(private service :TestService){
    
  }
  ngOnInit(): void {
   console.log("Hello",this.testValue);
  }

}
