import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {debounceTime, fromEvent, map, mergeMap, Observable, switchMap, tap} from "rxjs";
import {ajax} from "rxjs/internal/ajax/ajax";

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.css']
})
export class Test2Component implements OnInit, AfterViewInit {
  public url = 'https://api.github.com/search/users?q=';
  @ViewChild('new_input') public new_input!: ElementRef;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    let stream$: Observable<string> = fromEvent(this.new_input.nativeElement, 'input')
      .pipe(                              //указываем что результат наблюдаемого обьекта мы будем изенять
        map((item: any) => {       //изменяем каждый элемент слушаемого обьекта
          return item.target.value;
        }),                               //если нам надо сделать несколько обработок указываем их через зяпяту.
        debounceTime(1000),       //не стримим пока не пройдет 1 секунда после завершения ввода
        switchMap(inputValue => {  //switchMap создает внутрисебя новый Observable и передает в него параметры из прошлого
          return ajax.getJSON(this.url + (inputValue || '***'))  //ajax это как раз встроенна ф-ция rxjs типа Observable
        }),
        map((response: any) => {
          return response.items
        }),
        tap(console.log),             //пространство для внешних манипуляций
        // mergeMap(item => item),    //можноиспользовать для того что бы выводить все не оним массивом а отдельно каждый элемент
      )

    stream$.subscribe((i) => {
      console.log(i);
    })
  }

}
