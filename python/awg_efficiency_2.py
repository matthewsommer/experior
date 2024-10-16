import numpy as np
import plotly.graph_objects as go

# Constants
R_v = 461.5  # J/(kg·K)

# Temperature from 0 to 50 degrees Celsius in steps of 5
T_C = np.arange(0, 51, 5)  # [0, 5, 10, ..., 50]

# Relative Humidity from 0% to 100% in steps of 10
RH = np.arange(0.0, 1.01, 0.1)  # [0.0, 0.1, ..., 1.0]

# Prepare data for plotting
data = []
labels = []

# Calculate output power for each combination of T and RH
for T in T_C:
    for rh in RH:
        if rh > 0:  # Prevent log(0)
            z_value = R_v * (T + 273.15) * np.log(1 / rh) / 1_000  # in kJ
            data.append((T, rh * 100, z_value))  # Store T, RH in %, and output power
            labels.append(f'T: {T}°C, RH: {rh*100}%, Z: {z_value:.2f} kJ')  # Create label

# Unpack data
x_values, y_values, z_values = zip(*data)

# Create a 3D scatter plot
fig = go.Figure(data=[go.Scatter3d(
    x=x_values,
    y=y_values,
    z=z_values,
    mode='markers+text',
    marker=dict(size=5, color='blue', opacity=0.8),
    textposition="top center"
)])

# Update layout
fig.update_layout(title='3D Scatter Plot of Output Power (kJ) at Various Temperature and Humidity Levels',
                  scene=dict(xaxis_title='Temperature (°C)',
                             yaxis_title='Relative Humidity (%)',
                             zaxis_title='Min Power (kJ/kg)'))

# Show the plot
fig.show()
