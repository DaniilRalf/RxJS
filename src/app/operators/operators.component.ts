import {Component, OnInit} from '@angular/core';
import {Observable,
  of, startWith, switchMap, scan, interval, combineLatest, timer} from "rxjs";

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit {

  public stream$!: Observable<number>

  constructor() {
  }

  ngOnInit(): void {
    // this.switchMap()
    // this.startWith()
    // this.scan()
    // this.add()
    // this.combineLatest()
  }



  /*? Methods============================================================================================*/

  /* * .add()
   * * Объединять, так что вызов unsubscribe()одной подписки может отменить подписку на несколько подписок.
   * * Можно сделать это, «добавив» одну подписку в другую*/
  add() {
    const observable1 = interval(400);
    const observable2 = interval(300);
    const subscription = observable1.subscribe(x => console.log('first: ' + x));
    const childSubscription = observable2.subscribe(x => console.log('second: ' + x));
    // группируем обе подписки в одну
    subscription.add(childSubscription);
    setTimeout(() => {
      // На этом месте отписываемся от обеих подписок
      subscription.unsubscribe();
    }, 1000);
  }

  /*? Methods============================================================================================*/



  /*? Operators===========================================================================================*/

  /* * switchMap
   * * На каждый элемент первичного потока открывается вторичный поток
   * * и испуспускает стольео знавчений сколько нужно(в моем случае 2) перед тем как запустить вторичный поток на следющий элемент*/
  switchMap() {
    this.stream$ = of(1, 2, 4)
      .pipe(
        switchMap((item: number) => of(item * 2, item * 3))
      )

    this.stream$.subscribe((data) => {
      console.log(data) // 2 3 | 4 6 | 8 12
    })
  }


  /* * startWith
   * * Вклинивает первым элементом потока то число которое мы указали
   * * Аналогичен BehaviorSubject*/
  startWith() {
    this.stream$ = of(1, 2, 4)
      .pipe(
        startWith(10)
      )
    this.stream$.subscribe((data) => {
      console.log(data) // 10 1 2 4
    })
  }


  /* * scan
   * * работает как редьюсер из ванильной JS*/
  scan() {
    this.stream$ = of(1, 2, 4)
      .pipe(
        scan((total, n) => {
          console.log(`${total} - ${n}`) //  1-2  3-4
          return total + n
        })
      )
    this.stream$.subscribe((data) => {
      console.log(data) // 1 3 7
    })
  }


  /* * combineLatest
   * * Принимает аргументы-Обсерверы, когда отрабатывает один из Обсерверов,
   * * Выдаются в виде массива все последние значения остальных обсерверов и того который отработал */
  combineLatest() {
    // timerOne выдает первое значение через 1 секунду, затем каждые 4 секунды
    const timerOne$ = timer(1000, 4000);
    // timerTwo выдает первое значение через 2 секунды, затем каждые 4 секунды
    const timerTwo$ = timer(2000, 4000);
    // timerThree выдает первое значение через 3 секунды, затем каждые 4 секунды
    const timerThree$ = timer(3000, 4000);

    // когда срабатывает один из таймеров, выдается последнее значение с каждого таймера в виде массива
    combineLatest(timerOne$, timerTwo$, timerThree$)
      .subscribe(([timerValOne, timerValTwo, timerValThree]) => {
        console.log(
          `Timer One Latest: ${timerValOne},
           Timer Two Latest: ${timerValTwo},
           Timer Three Latest: ${timerValThree}`
        );
          /*
          Example:
          Первый тик: 'Timer One Latest: 0, Timer Two Latest: 0, Timer Three Latest: 0'
          Второй тик: 'Timer One Latest: 1, Timer Two Latest: 0, Timer Three Latest: 0'
          Третий тик: 'Timer One Latest: 1, Timer Two Latest: 1, Timer Three Latest: 0'
          */
      }
    )
  }

  /*? Operators===========================================================================================*/
}
