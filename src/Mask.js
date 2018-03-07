var dp = dp || {};

/**
 * Mask is a string entity representing a number permutation in format 'left--2_digit_middle--right' parts
 *
 * E.g. number 113778 could result in 1-13-778, 11-37-78, 113-77-8 masks
 *
 * @author Atanas Roussev
 *
 * @param left      the left part of a permutation
 * @param middle    the 2-digit middle
 * @param right     the right part of a permutation
 *
 * @constructor
 */
dp.Mask = function (left, middle, right) {
    this.left = left;
    this.middle = middle;
    this.right = right;
    this.id = this.left + dp.SEPARATOR + this.middle + dp.SEPARATOR + this.right;
};
