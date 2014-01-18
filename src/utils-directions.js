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