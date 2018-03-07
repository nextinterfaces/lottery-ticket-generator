Lottery ticket generator
------------------------

### Problem:

    Winning Ticket!

    Your favorite uncle, Morty, is crazy about the lottery and even crazier about how he picks his “lucky”
    numbers. And even though his “never fail” strategy has yet to succeed, Uncle Morty doesn't let that get
    him down.

    Every week he searches through the Sunday newspaper to find a string of digits that might be potential
    lottery picks. But this week the newspaper has moved to a new electronic format, and instead of a
    comfortable pile of papers, Uncle Morty receives a text file with the stories.

    Help your Uncle find his lotto picks. Given a large series of number strings, return each that might be
    suitable for a lottery ticket pick. Note that a valid lottery ticket must have 7 unique numbers between
    1 and 59, digits must be used in order, and every digit must be used.

    For example, given the following strings:

    [ “1”, “42". “100848", “4938532894754”, “1234567”, “472844278465445”]

    Your function should return:

    4938532894754 -> 49 38 53 28 9 47 54
    1234567 -> 1 2 3 4 5 6 7

### Solution:

There are two solution provided - [BinarySearch.js](src/BinarySearch.js)  and [RecursionSearch.js](src/RecursionSearch.js).

[index.html](index.html) page contains an UI interface allowing to input numbers and generate tickets.
While doing so, browser console can also be used to observe the programming output.

Included Dependencies:
----------------------
* jquery.js
* underscore.js
* stylesheet

Precondition:
-------------
Each number provided consist of characters, a valid ticket could only contain single or 2-digit chars. So we need to permutate through all possible single and double digits combinations without loosing original order. This might look like:
```
1234567:
    1   2   3   4   5   6   7
    12      3   4   5   6   7
    1   23      4   5   6   7
    1   2   34      5   6   7
    1   2   3   45      6   7
    1   2   3   4   56      7
    ...
    12      34      56      7
    ...
```

`RecursionSearch.js` solution:
------------------------------
Recursion solution is a Binary Tree search. A given number is split in three parts, left (L), right (R) and middle (M). (L) and (R) are the bit representation of the data structure and the middle part(the 2-digits) is the singleton. A recursion is applied to traverse through all (L), (R) binary trees. E.g.

```
    Per example number 1234567 could be broken down to 12--34--567 where 12 is (L) bit, 567 is (R) bit
    and the middle 34 is (the singleton)
```



`BinarySearch.js` solution:
---------------------------
While building the Recursion algorithm above, something interesting was discovered. The ticket matrix resembled a binary data structure itself. E.g.
```
Number 12345 matrix:

    1   2   3   4   5
    12      3   4   5
    1   23      4   5
    1   2   34      5
    1   2   3   45   
    
Looks similar to a binary data structure:
    
    0   0   0   0   0
    1   0   0   0   0
    0   1   0   0   0
    0   0   1   0   0
    0   0   0   1   0
    ...
    
Where (1) represents the 2-digit elements and (0) the single digits
```

Having that pattern, it was obvious that the binary data structure iterations itself would lead to all possible 2-digit permutations. Example, number `6789` with 4 characters in length would have a biggest possible byte number of `1111` (four 1's), thus iterating through `0000` to `1111` would provide all possible 2-digits permutations. E.g.
 ```    
    ---- binary ---      ---- decimal index ----
    0   0   0   0               0
    0   0   0   1               1
    0   0   1   0               2
    0   1   0   0               3
    1   0   0   0               4
    ...
    1   1   0   1               13
    1   1   1   0               14
    1   1   1   1               15
    
    Iterating through 0 to the biggest decimal representation of the binary (15 in our case) provides all
    possible variations for number 6789
    
    6   7   8   9   -
    6   7   8   -   9
    6   7   -   89  
    6   -   78  9   
    -   67  8   9   
    ...
    -   6   78  9
    -   6   7   89
    -   6   7   8   9
    
```

The formula used to shift the indexes is bit-0 (no shifting), bit-1 (index+1, right shift), shown bellow:

```
    0   0   1   0       ->      6   7   -   89      // 8 shifted right
    0   1   0   0       ->      6   -   78  9       // 7 shifted right
    1   0   0   0       ->      -   67  8   9       // 6 shifted right
 ```

On the other hand, the permutation results wouldn't necessarily lead to unique results (shown bellow), so compacting of the matrix was applied
```
    0   0   0   0       ->      6   7   8   9   -   // no shift      
    1   1   1   1       ->      -   6   7   8   9   // all right shift
    
    Same ticket, but different positioning based on the index.
```

Both solutions provide lottery rules validation as required