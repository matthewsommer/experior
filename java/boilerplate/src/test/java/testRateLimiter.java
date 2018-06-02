import org.junit.Test;

public class testRateLimiter {

  @Test
  public void testSimpleRequest() {
    RateLimiter rateLimiter = new RateLimiter();
    assert(rateLimiter.isAllowed(0));

  }

  @Test
  public void testMultipleRequests() {
    RateLimiter rateLimiter = new RateLimiter();
    assert(rateLimiter.isAllowed(0));
    assert(rateLimiter.isAllowed(1));
    assert(rateLimiter.isAllowed(2));
    assert(rateLimiter.isAllowed(3));
    assert(rateLimiter.isAllowed(4));
    assert(!rateLimiter.isAllowed(5));
    assert(!rateLimiter.isAllowed(6));
  }

  @Test
  public void testSlowRequests() {
    RateLimiter rateLimiter = new RateLimiter();
    assert(rateLimiter.isAllowed(0));
    assert(rateLimiter.isAllowed(1000));
    assert(rateLimiter.isAllowed(2000));
    assert(rateLimiter.isAllowed(3000));
    assert(rateLimiter.isAllowed(4000));
    assert(rateLimiter.isAllowed(5000));
    assert(rateLimiter.isAllowed(6000));
  }

  @Test
  public void testExactLimits() {
    RateLimiter rateLimiter = new RateLimiter();
    assert(rateLimiter.isAllowed(0));
    assert(rateLimiter.isAllowed(1));
    assert(rateLimiter.isAllowed(2));
    assert(rateLimiter.isAllowed(3));
    assert(rateLimiter.isAllowed(4));
    assert(!rateLimiter.isAllowed(1999));
    assert(rateLimiter.isAllowed(2001));
  }

}
