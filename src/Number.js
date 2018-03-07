var dp = dp || {};

/**
 * This constructs a Number entity consisting of length, mask and number
 *
 * @author Atanas Roussev
 *
 * @param number the string number, e.g. "123456789"
 * @constructor
 */
dp.Number = function (number) {
    this.number = number;
};

/**
 * @returns {number} the char length of the number
 */
dp.Number.prototype.getLength = function () {
    return this.number.length;
};

/**
 * @returns {string} the number in string format
 */
dp.Number.prototype.toString = function () {
    return this.number;
};

/**
 * Converts to Mask object based on given index
 */
dp.Number.prototype.toMask = function (index) {
    return dp.stringToMask(this.number, index);
};


