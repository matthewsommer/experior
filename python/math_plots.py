import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0.01, 0.99, 100)  # Avoid 0 to prevent log(0)
y = np.log(1 / x)  # or -np.log(x)

x_percent = x * 100

plt.plot(x_percent, y)
plt.title(r'Plot of $\ln\left(\frac{1}{RH}\right)$')
plt.xlabel('Relative Humidity')
plt.xticks(np.arange(0, 101, 10))  # Set x-ticks from 0 to 100 in steps of 10
plt.ylabel(r'$\ln\left(\frac{1}{RH}\right)$')
plt.grid()
plt.ylim(0, 5)  # Adjust as necessary
plt.show()
