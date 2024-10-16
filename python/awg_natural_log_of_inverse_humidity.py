import numpy as np
import matplotlib.pyplot as plt

# Define relative humidity values (RH) from 0.01 to 1 (to avoid log(0))
RH = np.linspace(0.01, 1, 100)  # Avoiding 0 to prevent log(0)

# Calculate y = ln(1/RH)
y = np.log(1 / RH)

# Create the plot
plt.figure(figsize=(10, 6))
plt.plot(RH * 100, y, label='y = ln(1/RH)', color='blue')
plt.title('Plot of y = ln(1/RH)')
plt.xlabel('Relative Humidity (RH)')
plt.ylabel('Work Multiplier')
plt.grid()
plt.legend()
plt.xlim(0, 100)
plt.ylim(0, 5)

plt.subplots_adjust(right=0.75)

# Add a description
description = ("This graph illustrates how the amount of work"
               " is multiplied by the Relative Humidity")
plt.text(103, 4, description, fontsize=12, ha='left', va='center', wrap=True)
plt.show()