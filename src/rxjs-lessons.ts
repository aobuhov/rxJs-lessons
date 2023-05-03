import {debounce, debounceTime, distinctUntilChanged, fromEvent, map, Observable} from "rxjs";

const search$ = fromEvent<Event>(
  document.getElementById('searchId')!,
  'input'
);

search$.pipe(
  map(event=> {return (event.target as HTMLInputElement).value}),
  debounceTime(500),
  map(value => {return value.length> 3 ? value: '';}),
  distinctUntilChanged()
).subscribe(value => {
  console.log(value)
});

