import { Component, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject } from "rxjs";

@Component({
  selector: 'app-obs-subj-behsubj',
  templateUrl: './obs-subj-behsubj.component.html',
  styleUrls: ['./obs-subj-behsubj.component.css']
})
export class ObsSubjBehsubjComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // this.difference()
    this.testing()
  }

  difference() {

    /* ? Subject======================================================== */
    // При подписке он всегда получает данные, которые были отправлены после подписки, т. е. предыдущие отправленные значения не получены.
    const mySubject = new Subject();

    mySubject.next(1);

    const subscription1 = mySubject.subscribe(x => {
      console.log('From subscription 1:', x);
    });

    mySubject.next(2);

    const subscription2 = mySubject.subscribe(x => {
      console.log('From subscription 2:', x);
    });

    mySubject.next(3);

    subscription1.unsubscribe();

    mySubject.next(4);

    // Output
    // From subscription 1: 2
    // From subscription 1: 3
    // From subscription 2: 3
    // From subscription 2: 4



    /* ? ReplaySubject================================================ */
    // Сохраняет буфер предыдущих значений , которые будут переданы новым подпискам.
    // Если вы инициализируете a ReplaySubjectс размером буфера 1, то он на самом деле ведет себя точно так же, как BehaviorSubject.
    // Последнее значение всегда кэшируется, поэтому оно действует как значение, изменяющееся с течением времени.
    // Но различия есть. Например, если вы подписываетесь на завершенный BehaviorSubject, вы не получите последнее значение, но для a ReplaySubject(1)вы получите последнее значение.
    const myReplaySubject= new ReplaySubject(2)

    myReplaySubject.next(1)
    myReplaySubject.next(2)
    myReplaySubject.next(3)
    myReplaySubject.next(4)

    myReplaySubject.subscribe(x => {
      console.log('From 1st sub:', x)
    })

    myReplaySubject.next(5)

    myReplaySubject.subscribe(x => {
      console.log('From 2nd sub:', x)
    })

    // Output
    // From 1st sub: 3
    // From 1st sub: 4
    // From 1st sub: 5
    // From 2nd sub: 4
    // From 2nd sub: 5



    /* ? BehaviorSubject================================================== */
    // Аналогичны ReplaySubject, но повторно выдают только последнее выданное значение или значение по умолчанию, если ранее значение не выдавалось.
    const myBehaviorSubject= new BehaviorSubject<any>('Hey now!');

    myBehaviorSubject.subscribe((x: any) => {
      console.log('From 1st sub:', x)
    })

    myBehaviorSubject.next(5)

    myBehaviorSubject.subscribe((x: any) => {
      console.log('From 2nd sub:', x)
    })

    // Output
    // From 1st sub: Hey now!
    // From 1st sub: 5
    // From 2nd sub: 5



    /* ? AsyncSubject================================================== */
    const sub = new AsyncSubject();

    sub.subscribe((item) => {
      console.log('first sub:', item)
    });

    sub.next(111)

    sub.subscribe((item) => {
      console.log('second sub:', item)
    });

    sub.next(222)
    sub.next(333)
    sub.complete();

    // Output
    // first sub: 333
    // second sub: 333
    // выведет последнее значение только после завершения
  }



  testing() {
    const testSubject = new ReplaySubject(2)
    testSubject.next(1)
    testSubject.next(2)
    testSubject.next(3)
    testSubject.next(4)
    testSubject.subscribe((item) => {
      console.log(item)
    })
    // Output
    // 3
    // 4
  }


}
