var dp = dp || {};

/*
 * Brevity log function
 */
window.log = window.console.log.bind(window.console);

/**
 * @type {string} separator used within a mask
 */
dp.SEPARATOR = '--';

/**
 * Converts a string to Mask, e.g. ('137788',2) -> '13--77--88'
 *
 * @param str
 * @param index
 * @returns {dp.Mask}
 */
dp.stringToMask = function (str, index) {
    var mask = new dp.Mask(
        str.substring(0, index),
        str.substring(index, index + 2),
        str.substring(index + 2)
    );
    return mask;
};

/**
 * Removes duplicate elements from array
 *
 * @param array
 * @param objProperty
 * @returns {Array} the unique array
 */
dp.uniqArray = function (array, objProperty) {
    var hash = {};
    var set = [];
    array.forEach(function (obj) {
        var key = (!dp.isNull(objProperty)) ? obj[objProperty] : obj;
        if (dp.isNull(hash[key])) {
            set.push(key);
        }
        hash[key] = obj;
    });

    return set;
};

/**
 * Returns true if (val) is undefined or null
 */
dp.isNull = function (val) {
    return val == null;
};

/**
 * Converts mask from condensed format (1-23-4567) to normalized ticket format (1-23-4-5-6-7), while preserving
 * the middle 2-digits
 *
 * @param maskStr the mask
 * @returns {string} a normalized string
 */
dp.normalizeMask = function (maskStr) {
    var arr = [];
    maskStr = maskStr.split(dp.SEPARATOR);
    maskStr.forEach(function (num) {
        // preserve the 2-digit and store them
        if (num.length <= 2) {
            arr.push(num);
            // expand condensed digits to single digits
        } else {
            arr = arr.concat(num.split(''));
        }
    });
    return arr.join(dp.SEPARATOR);
};

/**
 * Trim masks from redundant separators (--) and removes the duplicates.
 *
 * @param array the mask array
 * @returns {Array} a unique set of masks
 */
dp.compactAndNormalize = function (array) {
    var compactArray = [];
    array.forEach(function (mask) {
        var trimmed = _.compact(mask.split(dp.SEPARATOR)).join(dp.SEPARATOR);
        var normalized = dp.normalizeMask(trimmed);
        compactArray.push(normalized);
        //log(mask, '\t\t', normalized);
    });
    compactArray = dp.uniqArray(compactArray);
    return compactArray;
};

/**
 * Returns an array of valid tickets from a given mask array
 *
 * @param maskArray an array of mask strings, e.g. ['1--22--33','12--23--3']
 * @returns {Array} of valid lottery Ticket objects
 */
dp.validTickets = function (maskArray, number) {

    var compactArray = dp.compactAndNormalize(maskArray);

    log('\n\n======= ' + compactArray.length + ' possible permutations for Number(' + number + ')');
    var tickets = [];
    compactArray.forEach(function (mask) {
        var ticket = new dp.Ticket(mask.split(dp.SEPARATOR).map(Number));
        if (ticket.isValid()) {
            tickets.push(ticket.getNumbers());
        }
        log(ticket.toString(), (ticket.isValid() ? '\t\t@@@@@@@@@@@@ VALID TICKET @@@@@@@@@@@@' : ''));
    });

    return tickets;
};

/**
 * Creates an array(length) of empty strings
 */
dp.emptyArr = function (length) {
    var arr = [];
    for (var i = 0; i < length; i++) {
        arr[i] = '';
    }
    return arr;
};