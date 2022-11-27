import { Component, OnInit } from '@angular/core';
import {map, observable, Observable, of, OperatorFunction, take, tap} from "rxjs";

@Component({
  selector: 'app-test3',
  templateUrl: './test3.component.html',
  styleUrls: ['./test3.component.css']
})
export class Test3Component implements OnInit {

  myObservbl: Observable<number> = of(1,2,3,4,5);

  constructor() { }

  ngOnInit(): void {

    // this.myObservbl.subscribe(i => {
    //   console.log(i)
    // })
    //
    // this.myObservbl.pipe(
    //   // take(2)        //выдает значение по конкретному номеру (выдаст значение 2)
    // )
    //   .subscribe(i => {
    //     console.log(i)
    //   })







    // let test = <T>(a: T)  => (b: number) => (c: number) => (source: Observable<any>) => source.pipe(
    //   map((i: number) => {
    //     return i + b;
    //   })
    // )
    type Test = <T extends number>(a: T) => (b: T) => (c: T) => OperatorFunction<T, T>

    let test: Test = (a)  => (b) => (c) => (source) => new Observable(observer => {
      return source.subscribe({
        next(value){
          observer.next(<any>value + <any>a)
        }
      })
    })

    this.myObservbl.pipe(


      // test<number>(10)(1)(1),

      (source) => new Observable(observer => {
        return source.subscribe({
          next(value){
            observer.next(<any>value + 10)
          }
        })
      }),

      (source) => source.pipe(
        map((i: any) => {
            return i + 10;
          })
        )


    ).subscribe((i) => {
      console.log(i)
    })
  }

}
