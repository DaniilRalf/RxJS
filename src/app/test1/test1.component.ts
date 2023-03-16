import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {map, Observable} from 'rxjs';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.css']
})


// Observable - наблюдаемый обьект, который мы отслеживаем "Конструктор источника событий"

// subscribe - подписка на .источник события для отслеживания изменения

// Observer - Наблюдатель, это потребитель значений, предоставляемых Observable.
// Наблюдатели, это просто набор обратных вызовов, по одному для каждого типа уведомления, доставляемого Observable: next, error, и complete.



export class Test1Component implements OnInit, AfterViewInit {
  @ViewChild('inputTest')
  public inputTest!: ElementRef;

  public observTest$ = new Observable(sub => {
    this.inputTest.nativeElement.addEventListener('input', (value: any) => {
      sub.next(value) //когда мы слушаем данный Обсервбл мы получаем значение value
    });
  });


  constructor() { }

  ngOnInit(): void {

    /* * Основная концепция Сабскрайбера выглядит так */
    const test2 = new Observable((subscriber) => {
      subscriber.next(2);
    });
    const subscriber = {
      next: (x: any) => { console.log(x)},
      error: () => {},
      complete: () => {}
    }
    const subscriber2 = {
      next: (x: any) => { console.log(x)},
    }
    test2.subscribe(subscriber)

  }

  ngAfterViewInit(): void { //вызываем подписку именно тут только для того чтобы инициализировались данные ДОМ
    this.observTest$.subscribe(qqq => {
      console.log(qqq);
    })
  }

}
