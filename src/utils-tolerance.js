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