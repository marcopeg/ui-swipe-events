/*! ui-swipe-events :: v0.0.0 :: 2014-01-18 */
(function() {


var defaults = {
    touch: true,
    mouse: true,
    directions: 'all',
    tolerance: 5
};

var overrides = {
    version: '0.1.0'
};
/* global defaults, overrides, extend, parseConfigDirections, parseConfigTolerance, TouchEvents, MouseEvents, getDirection, emitEvent */

/**
 * SwipeEvents
 *
 * detect different kind of events which performs or emulate a swipe
 * action on a target element.
 * 
 * It provide that element with custom events:
 * - swipestart
 * - swipemove
 * - swipeend
 *
 * Custom event properties:
 * - direction: left, right, up, down
 */


var SwipeEventsClass = {
    
    init: function(element, config) {
        this.config = extend({}, defaults, config, overrides);
        
        if (typeof element === 'string') {
            this.element = document.getElementById(element.replace('#',''));
        } else {   
            this.element = element;
        }
        
        this.config.directions = parseConfigDirections(this.config.directions);
        this.config.tolerance = parseConfigTolerance(this.config.tolerance);
        
        // private scope used during the action for calculations
        this.data = {
            sX: 0,
            s: 0,
            dX: 0,
            dY: 0,
            direction: ''
        };
        
        this.touchEvents = Object.create(TouchEvents).init(this);
        this.mouseEvents = Object.create(MouseEvents).init(this);
        
        this.start();
        
        // public API
        return {
            start: this.start.bind(this),
            stop: this.stop.bind(this)
        };
    },
    
    /**
     * Public API
     */
    
    start: function() {
        if (this.config.touch) {
            this.touchEvents.start();
        }
        if (this.config.mouse) {
            this.mouseEvents.start();
        }
    },
    
    stop: function() {
        if (this.config.touch) {
            this.touchEvents.stop();
        }
        if (this.config.mouse) {
            this.mouseEvents.stop();
        }
    },
    
    destroy: function() {
        this.stop();
    },
    
    
    /**
     * Main Event Logic
     */
    
    swipeStart: function(x, y) {
        this.data.sX = x;
        this.data.sY = y;
        this.data.direction = '';
    },
    
    swipeMove: function(x, y) {
        this.data.dX = x - this.data.sX;
        this.data.dY = y - this.data.sY;
        
        // event wasn't start yet
        if (!this.data.direction) {
            this.data.direction = getDirection(this);
            if (this.data.direction) {
                emitEvent(this.element, 'swipestart', this.data);
            }
        } 
        
        // event was going on
        else {
            emitEvent(this.element, 'swipemove', this.data);
        }
    },
    
    swipeEnd: function() {
        if (this.data.direction) {
            emitEvent(this.element, 'swipe', this.data);
        }
    }
    
};
var MouseEvents = {
    init: function(ctx) {
        this.ctx = ctx;
        this.bind();
        this.active = false;
        return this;
    },
    bind: function() {
        this.bindEventStart = this.eventStart.bind(this);
        this.bindEventMove = this.eventMove.bind(this);
        this.bindEventEnd = this.eventEnd.bind(this);
    },
    start: function() {
        this.ctx.element.addEventListener('mousedown', this.bindEventStart);
        document.addEventListener('mousemove', this.bindEventMove);
        document.addEventListener('mouseup', this.bindEventEnd);
    },
    stop: function() {
        this.ctx.element.removeEventListener('mousedown', this.bindEventStart, false);
        document.removeEventListener('mousemove', this.bindEventMove, false);
        document.removeEventListener('mouseup', this.bindEventEnd, false);
    },
    eventStart: function(e) {
        e.preventDefault();
        this.active = true;
        this.ctx.swipeStart(e.x, e.y);
    },
    eventMove: function(e) {
        if (this.active) {
            e.preventDefault();
            this.ctx.swipeMove(e.x, e.y);
        }
    },
    eventEnd: function(e) {
        e.preventDefault();
        this.ctx.swipeEnd();
        this.active = false;
    }
};
var TouchEvents = {
    init: function(ctx) {
        this.ctx = ctx;
        this.bind();
        return this;
    },
    bind: function() {
        this.bindEventStart = this.eventStart.bind(this);
        this.bindEventMove = this.eventMove.bind(this);
        this.bindEventEnd = this.eventEnd.bind(this);
    },
    start: function() {
        this.ctx.element.addEventListener('touchstart', this.bindEventStart);
        document.addEventListener('touchmove', this.bindEventMove);
        document.addEventListener('touchend', this.bindEventEnd);
    },
    stop: function() {
        this.ctx.element.removeEventListener('touchstart', this.bindEventStart, false);
        document.removeEventListener('touchmove', this.bindEventMove, false);
        document.removeEventListener('touchend', this.bindEventEnd, false);
    },
    eventStart: function(e) {
        e.preventDefault();
        this.ctx.swipeStart(e.touches[0].clientX, e.touches[0].clientY);
    },
    eventMove: function(e) {
        e.preventDefault();
        this.ctx.swipeMove(e.touches[0].clientX, e.touches[0].clientY);
    },
    eventEnd: function(e) {
        e.preventDefault();
        this.ctx.swipeEnd();
    }
};

function emitEvent(target, name, data) {
    try {
        var event = new CustomEvent(name, {
            bubbles: true,
            cancelable: true
        });
        event.direction = data.direction;
        target.dispatchEvent(event);
    } catch(e) {
        console.warn('SwipeEvents: your browser do not support CustomEvent!');
    }
}

function extend() {
    for(var i=1; i<arguments.length; i++) {
        for(var key in arguments[i]) {
            if (arguments[i].hasOwnProperty(key)) {
                arguments[0][key] = arguments[i][key];
            }
        }
    }
    return arguments[0];
}

function parseConfigTolerance(tolerance) {
        
    // single value for all sides
    if (typeof tolerance == 'number' || typeof tolerance == 'string') {
        return {
            left: tolerance,
            right: tolerance,
            up: tolerance,
            down: tolerance
        };
    }
    
    // array: vertical, horizontal tolerance
    if (typeof tolerance == 'object' && tolerance.length === 2) {
        return {
            left: tolerance[1],
            right: tolerance[1],
            up: tolerance[0],
            down: tolerance[0]
        };
    }
    
    // array: top, right, bottom, left
    if (typeof tolerance == 'object' && tolerance.length === 4) {
        return {
            top: tolerance[0],
            right: tolerance[1],
            bottom: tolerance[2],
            left: tolerance[3]
        };
    }
    
    // each side tolerance
    if (typeof tolerance !== 'object') {
        tolerance = {
            left: 0,
            right: 0,
            up: 0,
            down: 0
        };
    }
    
    return tolerance;
}
/**
 * Convert a directions string into a list of single
 * directions
 */
function parseConfigDirections(directions) {
    directions = directions.toLowerCase();
    switch (directions) {
        case 'h':
        case 'horizontal':
            directions = 'left, right';
            break;
        case 'v':
        case 'verticals':
            directions = 'up, down';
            break;
        case 'l':
        case 'left':
            directions = 'left';
            break;
        case 'r':
        case 'right':
            directions = 'right';
            break;
        case 'u':
        case 'up':
            directions = 'up';
            break;
        case 'd':
        case 'down':
            directions = 'down';
            break;
        default:
            directions = 'left, right, up, down';
            break;
    }
    return directions.split(',').map(function(item) {
        return item.replace(/^\s+|\s+$/g, '');
    });
}


/**
 * Detect the direction of a swipe action
 */

function getDirection(ctx) {
    for (var i=0; i<ctx.config.directions.length; i++) {
        switch(ctx.config.directions[i]) {
            case 'left':
                if (isLeftDirection(ctx)) {
                    return ctx.config.directions[i];
                }
                break;
            case 'right':
                if (isRightDirection(ctx)) {
                    return ctx.config.directions[i];
                }
                break;
            case 'up':
                if (isUpDirection(ctx)) {
                    return ctx.config.directions[i];
                }
                break;
            case 'down':
                if (isDownDirection(ctx)) {
                    return ctx.config.directions[i];
                }
                break;
        }
    }
    return '';
}

function isLeftDirection(ctx) {
    return ctx.data.dX < 0 && Math.abs(ctx.data.dX) >= ctx.config.tolerance.right;
}

function isRightDirection(ctx) {
    return ctx.data.dX >= ctx.config.tolerance.left;
}

function isUpDirection(ctx) {
    return ctx.data.dY < 0 && Math.abs(ctx.data.dY) >= ctx.config.tolerance.up;
}

function isDownDirection(ctx) {
    return ctx.data.dY >= ctx.config.tolerance.down;
}
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



})();