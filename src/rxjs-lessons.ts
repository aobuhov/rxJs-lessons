import {debounce, debounceTime, distinctUntilChanged, map, Observable} from "rxjs";

const search$ = new Observable<Event>(observer => {
  const search = document.getElementById('searchId');
  if (!search) {
    observer.error('element dont exist on the page');
    return;
  }
  search.addEventListener('input', event => {
    observer.next(event);
  });
});

// search$.subscribe(value => {
//   console.log(10, value);
//   }
//   , error => {console.log(error)})
// ;

// search$.subscribe({
//   next: value => console.log(value),
//   error: err => console.log(err)
// });

search$.pipe(
  map(event=> {return (event.target as HTMLInputElement).value}),
  debounceTime(500),
  map(value => {return value.length> 3 ? value: '';}),
  distinctUntilChanged()
).subscribe(value => {
  console.log(value)
});

