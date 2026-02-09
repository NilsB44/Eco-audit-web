# Carbon Footprint Calculator

A Next.js application to calculate an estimated carbon footprint based on energy usage and transport.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## CO2e Calculator

The core calculation logic is in `src/lib/co2e-calculator.ts`. It uses the following emission factors:

*   **Electricity**: 0.475 kg CO2e/kWh (global average)
*   **Transport**: 0.17 kg CO2e/km (average passenger car)

These are estimates for 2024 and can vary based on your location and vehicle.

## Project Structure

This is a Next.js project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

*   `src/app/page.tsx`: The main page with the calculator UI.
*   `src/lib/co2e-calculator.ts`: The core calculator utility.
*   `public/`: Static assets.
*   `GEMINI.md`: Style and logic rules (as provided by the user).