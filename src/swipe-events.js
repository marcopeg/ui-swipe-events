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