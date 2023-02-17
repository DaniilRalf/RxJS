import { Component, OnInit } from '@angular/core';
import {from, fromEvent, interval, Observable, of, take} from 'rxjs';
import {watch} from "rxjs-watcher";
import {ajax} from "rxjs/internal/ajax/ajax";

@Component({
  selector: 'app-intensive',
  templateUrl: './intensive.component.html',
  styleUrls: ['./intensive.component.css']
})
export class IntensiveComponent implements OnInit {
  sequence1$!: Observable<number>; //создаем "Наблюдаемого"
  sequence2$!: Observable<any>; //создаем "Наблюдаемого"
  sequence3$!: Observable<any>; //создаем "Наблюдаемого"
  sequence4$!: Observable<any>; //создаем "Наблюдаемого"

  constructor() { }

  ngOnInit(): void {
    // this.test_1()
    // this.test_2()
    this.test_3()
  }

  test_1() {
    this.sequence1$ =  new Observable( (observer: any) => { //"Наблюдаемому" аргументом передаем "Наблюдаетель"
      let count: number = 1;
      const interval = setInterval(() => {
        if (count > 15) {
          clearInterval(interval)
          observer.complete()
          return
        }
        observer.next(count++) //Асинхроно передаем "Наблюдаемому" поток значений
      }, 1000)
    })

    this.sequence1$.subscribe({ //подписываемся на "Наблюдаемого"
      next(v: any) { //вызываем метод "Наблюдателя" (можно более короткой записью)
        console.log(v)
      },
      complete() {
        console.log('complete')
      }
    })

    //тут я протестит с помошью расширения rxjs-watcher как происходит отписка
    //и она действительно происходит после тейка или после ручной отписки
    //
    //проверил что происходит с подпиской после перехода на другой компонеет, подписка реально остается
    //поэтому при дропе компонента всегда надо отписываться, иначе при возврате на этот же компонент подписка дублируется
    //
    // let sub = this.sequence$.pipe(
    //   watch('test watch', 50),
    // ).subscribe((i) => {
    //   console.log(i)
    // })
    //
    // setTimeout(() => {
    //   sub.unsubscribe()
    // }, 5000)
  }

  test_2() {
    //"Наблюдаемые" бывают конечные и бесконечный,
    // примеры - (конечный - передача елементов через некст, бесконечный - вебсокеты)

    //"Наблюдаемые" бывают Холодные и горячие
    //Холодные это когда при подписке мы получим все данные с НАЧАЛА
    //Горячие это когда мы получим данные которые находятся в потоке В МОМЕНТ подписки

    //Холодный пример: не смотря на то что мы подписались вторым сабом на 3 секунды позже,
    //мы все равно получаем данные с нуля а не с того момента на котором был уже первый саб
    this.sequence2$ = interval(1000)
    let sub1 = this.sequence2$.subscribe( (i: any) => {
      console.log('Sub-1', i)
    })
    setTimeout( () => {
      let sub2 = this.sequence2$.subscribe( (i: any) => {
        console.log('Sub-2', i)
      })
    }, 3000)

    //Горячий пример: получаем только данные с момента подписки,
    //для примера используем поток кликов мыши по документу
    this.sequence3$ = fromEvent<MouseEvent>(document, 'click')
    let sub3 = this.sequence3$.subscribe( (i: any) => {
      console.log('Sub-3', i)
    })
    setTimeout( () => {
      let sub4 = this.sequence3$.subscribe( (i: any) => {
        console.log('Sub-4', i)
      })
    }, 3000)
  }

  test_3() {
    //Часто используемые операторы создания

    this.sequence4$ = of(1, 2, 3) //Конечный, Холодный

    this.sequence4$ = from([1, 2, 3]) //Конечный, Холодный (из массива)
    this.sequence4$ = from(
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
    ) //Конечный, Холодный (из промиса, по сути перевод промиса в поток может пригодиться если мы захотим обьединять потоки)

    this.sequence4$ = ajax('https://jsonplaceholder.typicode.com/posts')//Безонечный, Горячий (напрямую создать поток их аджакс запросов)


    // this.sequence4$.subscribe(i => {
    //   console.log(i)
    // })
  }

}
