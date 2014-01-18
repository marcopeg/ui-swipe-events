/* global SwipeEventsClass, MouseEvents, TouchEvents */
    
// forward isolated objects for debug pourpose
window.SwipeEventsDebug = {
    SwipeEventsClass: SwipeEventsClass,
    MouseEvents: MouseEvents,
    TouchEvents: TouchEvents
};

window.SwipeEvents = function() {
    var instance = Object.create(SwipeEventsClass);
    return instance.init.apply(instance, arguments);
};

window.addSwipeEvents = function(target, options) {
    return new window.SwipeEvents(target, options);
};
