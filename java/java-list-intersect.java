import java.io.*;
import java.util.*;

class Solution {
  public static void main(String[] args) {
    // Calculating the intersection of two sorted lists: e.g.
    // evaluating the AND operator in a search engine.

    // Search query: foo AND bar
    // Here are the lists of documents containing each term.
    List<Integer> fooDocs = Arrays.asList(1, 3, 5, 7, 8, 9, 10, 12);
    List<Integer> barDocs = Arrays.asList(2, 4, 5, 8, 10, 11, 12);
    
    // expected: 5, 8, 10, 12

    for (Integer i : intersect(fooDocs, barDocs)) {
      System.out.println(i);
    }
  }
  
  // intersect returns a new List with all elements in both a and b
  static List<Integer> intersect(List<Integer> a, List<Integer> b) {
    
    // For every element value in a list does second list contain any of those element values
    
    
    List<Integer> integerList = new ArrayList<>();
    for (Integer i = 0; i < a.size(); i++) {
      for (Integer j = 0; j < b.size(); j++) {
        if(a.get(i) == b.get(j)) {
          integerList.add(b.get(j));
        }
      }
    }
    return integerList;
  }
}