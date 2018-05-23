import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

import org.junit.Test;

public class testApp {

  @Test
  public void testSum() {
   assertEquals(6, App.sum(1,5));
   assertNotEquals(20, App.sum(7,20));
  }

}