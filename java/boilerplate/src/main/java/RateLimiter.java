import java.util.ArrayList;
import java.util.List;

public class RateLimiter {

  private String customer;
  private List<Long> listRequstTimes = new ArrayList<Long>();

  public boolean isAllowed(long requestTime) {

     if(listRequstTimes.size() > 0) {
       Long oldestRequest = listRequstTimes.get(0);

       if ((requestTime - oldestRequest) > 2000) {
         listRequstTimes.remove(0);
         listRequstTimes.add(requestTime);
         return true;
       } else if (listRequstTimes.size() == 5)  {
         return false;
       } else {
         listRequstTimes.add(requestTime);
         return true;
       }

     } else {
       listRequstTimes.add(requestTime);
       return true;
     }
  }
}
