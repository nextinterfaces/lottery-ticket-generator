var dp = dp || {};

/**
 * Ticket is a collection of 7 unique valid lottery numbers [1 to 59]
 *
 * @author Atanas Roussev
 *
 * @param array the number array
 * @constructor
 */
dp.Ticket = function (array) {
    this.array = array;
    this.valid;
};

/**
 * @type {number} max count of numbers allowed within a ticket
 */
dp.Ticket.NUMBER_COUNT = 7;

/**
 * @type {number} least number allowed
 */
dp.Ticket.MIN_NUMBER = 1;

/**
 * @type {number} max number allowed
 */
dp.Ticket.MAX_NUMBER = 59;

/**
 * @returns {boolean} returns true if this ticket satisfies lottery validation rule of unique 7 numbers between (1-59)
 */
dp.Ticket.prototype.isValid = function () {
    if (!dp.isNull(this.valid)) { // no need to double check
        return this.valid;
    }

    /**
     * @returns {boolean} true if array contains duplicate of element
     */
    var hasDuplicate_ = function (element, arr) {
        var firstIndex = arr.indexOf(element);
        var lastIndex = arr.lastIndexOf(element);

        return (firstIndex !== lastIndex && firstIndex > -1 && lastIndex > -1);
    };

    this.valid = true;
    if (this.array.length != dp.Ticket.NUMBER_COUNT) {
        this.valid = false;
        return;
    }
    for (let n of this.array) {
        if (!Number.isInteger(n)) {
            this.valid = false;
            return;
        }
        if (n < dp.Ticket.MIN_NUMBER || n > dp.Ticket.MAX_NUMBER) {
            this.valid = false;
            return;
        }
        if (hasDuplicate_(n, this.array)) {
            this.valid = false;
            return;
        }
    }
    return this.valid;
};

/**
 * @returns {array} of the ticket numbers
 */
dp.Ticket.prototype.getNumbers = function () {
    return this.array;
};

/**
 * @returns {string} representation of the ticket
 */
dp.Ticket.prototype.toString = function () {
    return this.array.join(dp.SEPARATOR);
};



