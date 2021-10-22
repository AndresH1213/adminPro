import { Component, OnDestroy } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { map, retry, take } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription;

  constructor() {
    // this.returnObservable().pipe(
    //   retry()
    // ).subscribe(
    //   valor => console.log('subs',valor),
    //   error => console.warn('Error', error),
    //   ()=> console.info('obs termiando')
    // )
    this.intervalSubs = this.returnInterval().subscribe(console.log)
   }

   ngOnDestroy():void {
    this.intervalSubs.unsubscribe();
   }

   returnInterval(): Observable<number> {
     
    return interval(1000).pipe(
      take(4),
      map(num => num + 1)
    );
   }

   returnObservable(): Observable<number> {
    let i = 0;

    return new Observable<number>(observer => {
      const intervalo = setInterval(() => {
        i++
        observer.next(i)

        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (i === 2) {
          observer.error('i llego a 2')
        }
      },1000)
    });

   }

}
