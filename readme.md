SwipeEvents
===========

**SwipeEvents** is a standalone library which help in detecting **swiping actions** on both
_mobile_ and _desktop_ enviroments.

You can activate it on a target element:

```
addSwipeEvents('targetId');
```

then you can listen swipe events on that element:

```
var el = document.getElementById('targetId');
el.addEventListener('swipe', function(e) {
    alert('you swiped: ' + e.direction);
});
```

## Config Options

### touch

`true|false` set if to detect touch events

### mouse

`true|false` set if to detect mouse events

### directions

set wich swipe directions to detect and in wich priority.

`all` detect all directions with the following priority: left, right, up, down

`h` detect only left/right directions

`v` detect only up/down directions

`left` `right` `up` `down` detect a single direction

`left, up` custom set of directions

### tolerance

set a tolerance for a swipe action to be detect. it is something like "_you have to do XX pixel on left direction for a swipe event to be detected_".

`50` integer value set a pixel based tolerance to all directions

`[50, 100]` array of 2 values set vertical and horizontal tolerance

`[50, 100, 150, 200]` array of 4 values set a clockwise tolerance like in _CSS_: up, right, down, left

`{up: 50, right: 100}` set specific tolerance for each option with an object




## ToDo

- swipe detect a percentage swipeSize/containerSize, container should be given as fixed integer, DOM element or identifier
- steps: should emit 'swipestep' at given size or percentage... like jQueryUI draggable grid option...
- detect swipe from borders with some tolerance




