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