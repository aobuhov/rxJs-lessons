import {debounce, debounceTime, distinctUntilChanged, fromEvent, map, Observable} from "rxjs";

const search$ = new Observable<Event>(observer => {

  const search = document.getElementById('searchId');
  const stop = document.getElementById('stop');

    if (!search || !stop) {
        observer.error('element dont exist on the page');
        return;
      }

    const onSearch = (event: Event) => {
      console.log(123);
      observer.next(event);
    };

    const onStop = (event:Event)=> {
      observer.complete();
      clear();
    };

    search.addEventListener('input', onSearch);
    stop.addEventListener('click', onStop);

    const clear = () => {
      search.removeEventListener('input', onSearch);
      search.removeEventListener('click', onStop);
    };

  });

const searchSubscription = search$.pipe(
  map(event=> {return (event.target as HTMLInputElement).value}),
  debounceTime(500),
  map(value => {return value.length> 3 ? value: '';}),
  distinctUntilChanged()
).subscribe(value => {
  console.log(value)
});

setTimeout(() => {
  console.log('unsubcribed');
  searchSubscription.unsubscribe();
}, 10000);

