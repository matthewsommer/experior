# Generate contact information for Stephen Diehl
# http://www.stephendiehl.com

import os
import sys
import numpy
import string

if sys.version > '3':
    strl = str
else:
    strl = string

EMAIL = """
\xcd\xce\xbf\xca\xc2\xbf\xc8.\xc7.\xbe\xc3\xbf\xc2\xc6@\xc1\xc7\xbb\xc3\xc6.\xbd\xc9\xc7
"""

y = string.ascii_letters
n = len(y)
M = numpy.identity(n, dtype=numpy.int32)
M[:n, n-1] = 1

a = numpy.array(list(map(ord, y)), dtype=numpy.int32)
x = ''.join(map(chr, numpy.dot(M, a)))
uncipher = strl.maketrans(x,y)

print( strl.translate(EMAIL, uncipher) )