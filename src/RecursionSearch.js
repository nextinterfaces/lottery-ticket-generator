var dp = dp || {}; // namespace

dp.RecursionSearch = {};

/**
 * A binary tree recursive search for given number computing all possible single and 2-digit permutations, returning an
 * array of Mask strings E.g. (1234) -> [1-2-3-4, 12-3-4, 1-23-4, 1-2-34].
 *
 * Method is using Mask object splitting number string into (left,right) bit parts and (middle) 2-digit
 *
 * @author Atanas Roussev
 *
 * @param number
 * @returns {Array} of Mask strings e.g. ['1--2--56-7','12--56-7']
 */
dp.RecursionSearch.permutate = function (number) {


    var permutate_ = function (iterationNumber, inx, onUpdate) {
        if (inx <= iterationNumber.getLength()) {
            onUpdate(iterationNumber.toMask(inx), inx);
            permutate_(iterationNumber, ++inx, onUpdate);
        }
    };


    var matrix = [];
    permutate_(new dp.Number(number), -2, function (mask, inx) {
        //log(mask.id, ' {M}'); // Main node

        permutate_(new dp.Number(mask.right), -2, function (maskRight, inxRight) {
            var mRight = new dp.Mask(
                                        mask.left,
                                        mask.middle,
                                        maskRight.id);
            //log('\t' + mRight.id, ' [R]'); // Right node

            permutate_(new dp.Number(maskRight.left), -2, function (maskLeft, inxLeft) {
                var mLeft = new dp.Mask(
                                        mask.left + dp.SEPARATOR + mask.middle + dp.SEPARATOR + maskLeft.id,
                                        maskRight.middle,
                                        maskRight.right);
                //log('\t\t' + mLeft.id, ' (L)'); // Left node

                matrix.push(mLeft);
            });
        });
    });

    return dp.uniqArray(matrix, 'id');
};

/**
 * Starts search
 */
dp.RecursionSearch.start = function (numbers, onComplete) {

    numbers.forEach(function (num) {
        num = num.trim();
        var maskArray = dp.RecursionSearch.permutate(num);
        onComplete(num,  dp.validTickets(maskArray, num));
    });

};
