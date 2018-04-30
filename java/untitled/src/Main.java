import java.util.Arrays;

public class Main {

  public static void main(String[] args) {

    System.out.println(dec("01110200301122"));

  }

  public static String enc(final byte[] b) {
    if (b.length < 1) {
      return "";
    }

    StringBuffer sb = new StringBuffer((int) (b.length * 1.5));

    char prev = ctrl(b[0]);
    sb.append(prev);
    for (byte i : b) {
      if (ctrl(i) != prev) {
        sb.append(prev = ctrl(i));
      }

      sb.append(sym(i));
    }

    return sb.toString();
  }

  public static byte[] dec(final String s) {
    if (s.isEmpty()) {
      return new byte[0];
    }

    byte[] b = new byte[s.length()];

    int i = 0;
    char curr = 0;
    for (char c : s.toCharArray()) {
      if (c >= x3F && c <= xFF) {
        curr = c;

        continue;
      }

      b[i] = (byte) (((curr - x3F) << 6) | (c - '0'));

      ++i;
    }

    return Arrays.copyOfRange(b, 0, i);
  }

  static final char x3F = '#';
  static final char x7F = '$';
  static final char xBF = '%';
  static final char xFF = '&';

  static char[] ctrls =
      {
          x3F, x7F, xBF, xFF
      };

  static char ctrl(int b) {
    return ctrls[(b & 0b11000000) >> 6];
  }

  static char[] syms = new char[64];

  static {
    int i = 0;
    for (char c = '0'; c <= 'o'; c++) {
      syms[i++] = c;
    }
  }

  static char sym(int b) {
    return syms[b & 0b00111111];
  }

}