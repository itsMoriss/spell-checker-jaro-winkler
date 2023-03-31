var valid_word_list;

// initialize the valid word list
function set_valid_word_list(word_list) {
  valid_word_list = word_list;
}

// compute a score for each word in the valid word list based on its similarity to the input word 
function find_similar(word, score_thresh) {
  var max_size = 10;
  var top_words = [];
  var top_scores = [];

  for (var i = 0; i < valid_word_list.length; i++) {
    // compute score
    var element = valid_word_list[i];
    var temp_score = jaro_winkler(word, element);
    
    if (score_thresh < temp_score) {
      // check if it is a top score
      var index = getListIndex(top_scores, temp_score);
      if (index < max_size) {
        top_words.splice(index, 0, element);
        top_scores.splice(index, 0, temp_score);
        
        if (top_words.length > max_size) {
          top_words.pop();
          top_scores.pop();
        }
      }
    }
  }
  
  return [top_words, top_scores];
}

// return the index at which the similarity score x should be inserted into the scores array to maintain a sorted list of scores.
function getListIndex(scores, x) {
  for (var i = 0; i < scores.length; i++) {
    if (x > scores[i]) return i;
  }
  return scores.length;
}

// compute the Jaro-Winkler distance between two words
function jaro_winkler(s1, s2) {
  // set default values for m (matching characters) and t (transposition count)
  var m = 0, t = 0;

  // ensure s1 is shorter than or equal to s2
  if (s1.length > s2.length) {
    var temp = s1;
    s1 = s2;
    s2 = temp;
  }

  // calculate the matching characters and transpositions
  for (var i = 0; i < s1.length; i++) {
    var c1 = s1.charAt(i);
    var c2 = s2.charAt(i);
    
    if (c1 == c2) {
      m++;
    } else {
      // check for transposition
      if (s2.indexOf(c1) > -1) {
        t++;
      }
    }
  }
  
  // calculate the Jaro distance
  var jaro = (m / s1.length + m / s2.length + (m - t / 2) / m) / 3;

  
  // calculate the Jaro-Winkler distance
  var jaro_winkler = jaro + (s1.length > 0 ? Math.min(0.1, 0.1 / (1 - jaro) * Math.min(4, s1.length)) : 0);
  
  return jaro_winkler;
}
