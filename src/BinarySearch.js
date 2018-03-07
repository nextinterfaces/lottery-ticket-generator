var dp = dp || {};

dp.BinarySearch = {};

/**
 * Finds and returns all binary permutations for given integer (the length of a number).
 *
 * E.g. toMatrix(789) will permutate with factor of 3 (the number '789'.length) resulting in
 * ["000", "001", "010", "011", "100", "101", "110", "111"] binaries
 *
 * @author Atanas Roussev
 *
 * @param num the given number
 * @returns {Array} the array of binary permutations
 */
dp.BinarySearch.toMatrix = function (num) {

    /**
     * Converts binary to decimal, e.g. (101) -> 5
     */
    var bin2dec_ = function (bin) {
        return parseInt(bin, 2);
    };

    /**
     * Converts decimal to binary, e.g. (5) -> 101
     */
    var dec2bin_ = function (dec) {
        return (dec >>> 0).toString(2);
    };

    /**
     * Appends leading zeros to number with length shorter than max, e.g. ('101',6) -> '000101'
     */
    var normalize_ = function (bin, max) {
        if (bin.length < max) {
            bin = '0'.repeat(max - bin.length) + bin;
        }
        return bin;
    };

    var numLength = ('' + num).length;
    var permutations = [];
    var permutationCount = bin2dec_('1'.repeat(numLength));
    for (var i = 0; i <= permutationCount; i++) {
        permutations.push(normalize_(dec2bin_(i), numLength));
    }

    log('Permutations for number(' + num + ') ', permutations);
    return permutations;
};

/**
 * Iterates through binary matrix of a number and shifts the number chars based on location bit value
 * (0:char stays at same spot, 1:char is shifted right). This covers all possible number char permutations as
 * closely follows binary permutations.
 *
 * @param num number to permutate
 * @returns {Array} the generated variations in mask format, E.g. (123) -> ['1--2--3', '12--3', '1--23']
 */
dp.BinarySearch.permutate = function (num) {

    // TODO optimize the performance and allow numerics with length 7-14 (2 digits each * 7) only
    var arrNum = num.split('');

    var maskArray = [];

    dp.BinarySearch.toMatrix(num).forEach(function (bin) {
        var arrBin = bin.split('');
        var arrBuffer = dp.emptyArr(num.length + 1);
        arrBin.forEach(function (dig, i) {
            dig = parseInt(dig);
            arrBuffer[i + dig] = arrBuffer[i + dig] + '' + arrNum[i];
        });
        arrBuffer = _.compact(arrBuffer);
        var mask = arrBuffer.join(dp.SEPARATOR);
        maskArray.push(mask);
    });

    return maskArray;
};

/**
 * Starts search
 */
dp.BinarySearch.start = function (numbers, onComplete) {

    numbers.forEach(function (num) {
        num = num.trim();
        var maskArray = dp.BinarySearch.permutate(num);
        onComplete(num, dp.validTickets(maskArray, num));
    });

};
