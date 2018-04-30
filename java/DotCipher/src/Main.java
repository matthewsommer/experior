import com.google.common.base.Charsets;
import com.google.common.io.Resources;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

public class Main {

  private static String FILE_PATH = "dotcipher.json";

  public static void main(String[] args) {
    Gson gson = new Gson();
    try {
      String json = readFile(FILE_PATH);
      List<Circle> circleList = gson.fromJson(json, new TypeToken<List<Circle>>() {
      }.getType());
      int circleCount = circleList.size();
      int minX = circleList.stream().mapToInt(c -> c.cx).min().orElse(0);
      int maxX = circleList.stream().mapToInt(c -> c.cx).max().orElse(0);
      int minY = circleList.stream().mapToInt(c -> c.cy).min().orElse(0);
      int maxY = circleList.stream().mapToInt(c -> c.cy).max().orElse(0);

      List<String> fillList = circleList.stream()
          .filter(distinctByKey(c -> c.getFill())).map(Circle::getFill)
          .collect(Collectors.toList());

      List<Integer> xList = circleList.stream()
          .filter(distinctByKey(c -> c.getCx())).map(Circle::getCx)
          .collect(Collectors.toList());

      List<Integer> yList = circleList.stream()
          .filter(distinctByKey(c -> c.getCy())).map(Circle::getCy)
          .collect(Collectors.toList());

      List<Circle> keyCircles = circleList.stream()
          .filter(circle -> !circle.getFill().contains("#49B882")).collect(Collectors.toList());

      List<Circle> msgCircles = circleList.stream()
          .filter(circle -> circle.getFill().contains("#49B882")).collect(Collectors.toList());

      int distinctColorsCount = fillList.size();

      System.out.format("\nCircle Count: %d\n", circleCount);
      System.out.format("\nXmin: %d\nXmax: %d\n", minX, maxX);
      System.out.format("\nYmin: %d\nYmax: %d\n", minY, maxY);
      System.out.format("\nDistinct Colors: %d\n", distinctColorsCount);

      for (String fill : fillList) {
        System.out.format("\n%s - %d", fill,
            circleList.stream().filter(circle -> circle.getFill().contains(fill)).count());
      }

      System.out.format("\n\nUnique Colors Count: %d\n", keyCircles.size());
      System.out.format("No Colors Column Count: %d\n", msgCircles.stream()
          .filter(distinctByKey(c -> c.getCx()))
          .collect(Collectors.toList()).size());

      System.out.format("\nRows: %d", yList.size());
      System.out.format("\nColumns: %d\n\n", xList.size());

      List<List<Circle>> columnsList = new ArrayList<>();

      System.out.format("\n\nColumn Collections: %d\n",columnsList.size());


      for (Integer x : xList) {
        columnsList.add(
            circleList.stream().filter(circle -> circle.getCx() == x).collect(Collectors.toList()));
      }

      System.out.format("\n\nUnique color columns(64) X value: ");

      for (Circle circle: keyCircles) {
        System.out.format("%d,", circle.getCx() - 3);
      }

      System.out.format("\n\nUnique color columns(64) X normalized (divide by 11): ");
      for (Integer i = 0; i < keyCircles.size(); i++) {
        System.out.format("%d,", (keyCircles.get(i).getCx())/11);
      }

      System.out.format("\n\nSpacing between unique color columns(63): ");

      for (Integer i = 1; i < keyCircles.size(); i++) {
        int value = (keyCircles.get(i).getCx())/11 - 1;
        System.out.format("%d,", ((keyCircles.get(i).getCx())/11) - (keyCircles.get(i-1).getCx())/11);
      }

      System.out.format("\n\nSpacing between unique color columns(63) normalized to 0 (minus 1): ");
      int total = 0;
      for (Integer i = 1; i < keyCircles.size(); i++) {
        int i1 = (((keyCircles.get(i).getCx()) / 11)
            - (keyCircles.get(i - 1).getCx()) / 11) - 1;
        System.out.format("%d, ", i1);

      }

//      System.out.format("\n\n");
//
//      for (Integer i = 1; i < keyCircles.size(); i++) {
//        int value = (keyCircles.get(i).getCx() - keyCircles.get(i - 1).getCx())/11 - 1;
//        double v = Math.pow(16, value);
//        System.out.format("%d,", (int) v);
//      }
//
//      System.out.format("\n\n");
//
//      for (Integer i = 1; i < keyCircles.size(); i++) {
//        int value = (keyCircles.get(i).getCx() - keyCircles.get(i - 1).getCx())/11 - 1;
//        double v = Math.pow(4, value);
//        System.out.format("%d,", (int) v);
//      }

      System.out.format("\n\n\n");

    } catch (IOException e) {
      e.printStackTrace();
    }
  }


  public static String readFile(String urlStr) throws IOException {
    URL url = Resources.getResource(urlStr);
    return Resources.toString(url, Charsets.UTF_8);
  }

  public static <T> Predicate<T> distinctByKey(Function<? super T, Object> keyExtractor) {
    Map<Object, Boolean> seen = new ConcurrentHashMap<>();
    return t -> seen.putIfAbsent(keyExtractor.apply(t), Boolean.TRUE) == null;
  }

}
