import {Component, OnInit} from '@angular/core';
import {
  Observable,
  of,
  startWith,
  switchMap,
  scan,
  interval,
  combineLatest,
  timer,
  takeUntil,
  fromEvent,
  map,
  debounceTime,
  Subject, from, distinctUntilChanged, withLatestFrom
} from "rxjs";

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
    // this.takeUntil()
    // this.fromEvent()
    // this.debounceTime()
    // this.distinctUntilChanged()
    this.withLatestFrom()
  }



  /*? Methods============================================================================================*/

      /* * .add()
       * * Объединять, так что вызов unsubscribe() одной подписки, может отменить подписку на несколько подписок.
       * * Можно сделать это, «добавив» одну подписку в другую*/
      add() {
        const observable1 = interval(400);
        const observable2 = interval(300);
        const subscription = observable1.subscribe(x => console.log('first: ' + x));
        const childSubscription = observable2.subscribe(x => console.log('second: ' + x));
        // группируем обе подписки в одну
        subscription.add(childSubscription)
        setTimeout(() => {
          // На этом месте отписываемся от обеих подписок
          subscription.unsubscribe();
        }, 1000);
      }


      /* * .asObservable()
       * * Цель этого состоит в том, чтобы предотвратить утечку «стороны наблюдателя» субъекта из API.
       * * В основном, чтобы предотвратить дырявую абстракцию, когда вы не хотите, чтобы люди знали что некое значение это Observable*/
      asObservable(): Observable<any> {
        const subject = new Subject();
        return subject.asObservable();
      }

  /*? Methods============================================================================================*/



  /*? Operators===========================================================================================*/

      /* * takeUntil
       * * take - принимает аргумент в виде числа и останавливает подписку на поток после этого количества наблюдаемых
       * * takeUntil - принимает аргументом поток, как только в этом потоке будет испущено значение, подписка на поток в котором встроен takeUntil - прекратиться */
      takeUntil() {
        //выдает значение каждую секунду
        const source = interval(1000);
        //выдает значения каждые 5 секунд
        const timer$ = timer(5000);
        //как только появиться значение от timer$ подписка на source прекратиться
        source.pipe(takeUntil(timer$))
          .subscribe(val => {
            console.log(val) // 0,1,2,3
          });
      }


      /* * fromEvent
       * * фиксирует действия с элементами */
      fromEvent() {
        //создаем наблюдателя на клик по всей странице
        fromEvent(document, 'click')
          .pipe(map(event => `Event: ${event}`))
          .subscribe(val => console.log(val));  // event dom
      }


      /* * debounceTime
      * * Отбрасывает испускаемые значения, которые занимают меньше указанного времени между выводом */
      debounceTime() {
        const click$ = fromEvent(document, 'click');
        // ждем полсекунды между нажатиями, если меньше то значение отбрасывается
        click$
          .pipe(
            map(event => `Event: ${event}`),
            debounceTime(500)
          )
          .subscribe(val => console.log(val));  // event dom
      }


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


      /* * combineLatest
      * * Испускает значение только когда текущее значение отличается от последнего */
      distinctUntilChanged() {
        const source$ = from([1, 1, 2, 2, 3, 3])
        source$
          .pipe(distinctUntilChanged())
          .subscribe((item) => {
            console.log(item) // output: 1,2,3
          })
      }


      /* * withLatestFrom
      * * Объединяет исходный Observable с другими Observable для создания Observable,
      * * значения которого рассчитываются на основе последних значений каждого, только когда ИСТОЧНИК выдает элемент */
      withLatestFrom() {
        const source = interval(5000)  //emit every 5s
        const secondSource = interval(1000)  //emit every 1s
        source.pipe(
          withLatestFrom(secondSource),
        ).subscribe((item) => {
          console.log(item)
          // Вывод каждые 5 секунд
          // [0, 4]
          // [1, 9]
          // [2, 14]...
        })
      }

  /*? Operators===========================================================================================*/
}
