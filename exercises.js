// Retry
class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
    if (Math.random() < 0.2) {
        return a * b;
    } else {
        throw new MultiplicatorUnitFailure("Klunk");
    }
}

function reliableMultiply(a, b) { // Defines reliableMultiply with a b parameteters
    "use strict"; // Strict mode
    while (true) { // While true loop (will run while condition is true)
        try {
            return primitiveMultiply(a, b); // Returns primitiveMultiply with a b parameters
        } catch (exception) {
            if (!(exception instanceof MultiplicatorUnitFailure))
                throw exception; // Throws an exception
        }
    }
}
console.log(reliableMultiply(8, 8));


//The Locked Box
const box = {
    locked: true,
    unlock() { this.locked = false; },
    lock() { this.locked = true; },
    _content: [],
    get content() {
        if (this.locked) throw new Error("Locked!");
        return this._content;
    }
};

const box = {
    locked: true,
    unlock() { this.locked = false; },
    lock() { this.locked = true; },
    _content: [],
    get content() {
        if (this.locked) throw new Error("Locked!");
        return this._content;
    }
};

function withBoxUnlocked(body) {
    var boxU = box.locked; // Creates boxU boolean
    if (boxU) {
        box.unlock();
    }
    try {
        body();
    } finally {
        if (boxUn) {
            box.lock();
        }
    }
}

withBoxUnlocked(function() {
    box.content.push("gold piece");
});

try {
    withBoxUnlocked(function() {
        throw new Error("Pirates on the horizon! Abort!");
    });
} catch (e) {
    console.log("Error raised: " + e);
}
console.log(box.locked);