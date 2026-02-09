// app/src/lib/co2e-calculator.ts

/**
 * Emission factors for CO2e calculation.
 *
 * Sources:
 * - Electricity: Based on average grid intensity. This is a global average and can vary significantly by location.
 *   Source: Our World in Data, IEA, EPA (2024 estimates).
 * - Transport: Based on an average passenger car.
 *   Source: EPA, EEA (2024 estimates).
 */
const EMISSION_FACTORS = {
  // in kg CO2e/kWh
  ELECTRICITY: 0.475,
  // in kg CO2e/km
  TRANSPORT: 0.17,
};

/**
 * Calculates the estimated CO2e from energy usage and transport.
 *
 * @param energyUsageInKwh - Annual energy usage in kWh.
 * @param transportInKm - Annual distance traveled by car in km.
 * @returns The estimated total CO2e in tonnes.
 */
export function calculateCO2e(
  energyUsageInKwh: number,
  transportInKm: number
): number {
  if (energyUsageInKwh < 0 || transportInKm < 0) {
    throw new Error("Inputs must be non-negative.");
  }

  const co2eFromEnergy = energyUsageInKwh * EMISSION_FACTORS.ELECTRICITY;
  const co2eFromTransport = transportInKm * EMISSION_FACTORS.TRANSPORT;

  const totalCo2eInKg = co2eFromEnergy + co2eFromTransport;

  // Convert from kg to tonnes
  return totalCo2eInKg / 1000;
}
