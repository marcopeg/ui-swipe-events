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