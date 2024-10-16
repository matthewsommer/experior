import numpy as np
import matplotlib.pyplot as plt

# Constants
R_v = 461.5  # J/(kg·K)
T_C = np.linspace(0, 50, 100)  # Temperature in Celsius
T_K = T_C + 273.15  # Convert to Kelvin

# Relative Humidity (RH) values
RH = np.linspace(0.01, 0.99, 100)  # Avoid 0 to prevent log(0)

# Calculate the equation for each T and RH
X = np.zeros((len(T_C), len(RH)))  # Initialize a 2D array to hold results
for i, T in enumerate(T_K):
    X[i, :] = (R_v * T * np.log(1 / RH))/3600

# Plotting
plt.figure(figsize=(10, 6))
for i in range(len(T_C)):
    plt.plot(RH * 100, X[i, :], label=f'T = {T_C[i]} °C')

plt.title(r'$R_v \cdot T \cdot \ln\left(\frac{1}{\text{RH}}\right)$')
plt.xlabel('Relative Humidity (%)')
plt.ylabel('Value (J/kg)')
plt.grid()
plt.ylim(0, np.max(X))  # Adjust y limits based on maximum value
plt.xlim(0, 100)  # Limit x-axis to 0-100%
plt.show()