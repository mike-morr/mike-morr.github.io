---
author: Mike Morrison
created: 6/4/2018
title: Angular 6 Router - How To Get Route Parameters
---
In Angular 6 which now uses RxJs 6 I was having trouble figuring out how to get the route parameters
from the ParamMap.  After a lot of trial and error I finally was able to figure it out.

I am posting the code here so I can reference it in the future to avoid the pain of trying to figure
it out again.

First we need to import the right operator from RxJs:

```typescript
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
```

Next we need to actually get the value from the ParamMap:

```typescript
async ngOnInit () {
  this.route.paramMap.pipe(
    switchMap((params: ParamMap) =>
      of(params.get('postName'))
    )
  ).subscribe(d => this.postName = d);
}
```

The above code creates an observable of the route parameter and then we subscribe to the observable
so that we can set the ```postName``` property.
