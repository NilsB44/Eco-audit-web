import Link from 'next/link';
import instanceEmissions from '@/lib/instance-emissions.json';

export default function EmissionsPage() {
  const sortedEmissions = [...instanceEmissions].sort((a, b) => b.co2e_per_year_kg - a.co2e_per_year_kg);

  return (
    <main className="flex min-h-screen flex-col items-center p-8 sm:p-12 md:p-24 bg-gray-900 text-white">
      <div className="w-full max-w-6xl p-8 space-y-12">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-blue-400 hover:text-blue-300 underline mb-4 inline-block">
            &larr; Back to Dashboard
          </Link>
        </div>

        <header className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-green-400">AWS Instance Emissions</h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Estimated Carbon Dioxide Equivalent (CO2e) emissions for common AWS EC2 instance types. 
            Values are rough estimates assuming constant 50% utilization in an average region.
          </p>
        </header>

        <section className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Instance Type
                  </th>
                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Specs (vCPU / Mem)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Description
                  </th>
                   <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                    kg CO2e / Year
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                    kg CO2e / Month
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {sortedEmissions.map((instance) => (
                  <tr key={instance.type} className="hover:bg-gray-700 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-white">{instance.type}</div>
                    </td>
                     <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-400">{instance.vCPU} vCPU / {instance.memory}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-300">{instance.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm font-mono text-green-400 font-bold">{instance.co2e_per_year_kg.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm font-mono text-gray-400">{instance.co2e_per_month_kg.toFixed(2)}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="text-center text-sm text-gray-500">
          <p>
            * Disclaimer: These figures are for educational purposes only and are based on generalized emission factors. 
            Actual emissions depend heavily on the specific AWS region (grid carbon intensity), server utilization, and PUE of the data center.
          </p>
        </section>
      </div>
    </main>
  );
}
