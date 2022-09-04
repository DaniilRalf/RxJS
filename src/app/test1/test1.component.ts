import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.css']
})
export class Test1Component implements OnInit, AfterViewInit {
  @ViewChild('inputTest')
  public inputTest!: ElementRef;


  public observTest$ = new Observable(sub => {
    this.inputTest.nativeElement.addEventListener('input', (value: any) => {
      sub.next(value)
    });
  }); 
  

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.observTest$.subscribe(qqq => {
      console.log(qqq);
    })
  }

}
