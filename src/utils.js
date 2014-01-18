
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
