# spell-checker-jaro-winkler
This is an implementation of a client-side spell checker using the Jaro-Winkler algorithm.
Jaro-Winkler algorithm is a string matching algorithm that provides a similarity score between two strings by taking into account the number of matching characters, the number of transpositions, and the length of the common prefix.

The program computes the score for each word in the valid word list and compares it to a given threshold score. If the score is above the threshold, the word is considered similar to the input word and added to a list of top words, which is maintained in order of decreasing similarity score.
