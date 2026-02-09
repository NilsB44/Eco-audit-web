import auditResults from '@/lib/audit-results.json';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface AuditDetail {
  file: string;
  co2e: number;
  resources?: { instanceType: string }[];
  count?: number;
  dependencies?: number;
  devDependencies?: number;
}

interface ProjectAudit {
  project: string;
  totalCO2e: number;
  terraform: {
    files: number;
    resources: number;
    co2e: number;
    details: AuditDetail[];
  };
  dependencies: {
    files: number;
    count: number;
    co2e: number;
    details: AuditDetail[];
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const project = (auditResults as ProjectAudit[]).find(p => p.project === name);

  if (!project) {
    notFound();
  }

  const sortedTerraformDetails = project.terraform.details
    ? [...project.terraform.details].sort((a, b) => b.co2e - a.co2e)
    : [];

  const sortedDependencyDetails = project.dependencies.details
    ? [...project.dependencies.details].sort((a, b) => b.co2e - a.co2e)
    : [];

  return (
    <main className="flex min-h-screen flex-col items-center p-8 sm:p-12 md:p-24 bg-gray-900 text-white">
      <div className="w-full max-w-5xl p-8 space-y-12">
        <div className="flex items-center justify-between">
           <Link href="/" className="text-blue-400 hover:text-blue-300 underline mb-4 inline-block">
            &larr; Back to Dashboard
          </Link>
        </div>

        <header className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-green-400">{project.project}</h1>
          <p className="text-2xl text-gray-300">
            Total Estimated Footprint: <span className="text-green-400 font-bold">{project.totalCO2e.toFixed(2)} Tonnes CO2e</span>
          </p>
        </header>

        {/* Terraform Section */}
        {project.terraform.co2e > 0 && (
          <section>
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-green-300">
              Infrastructure Analysis (Terraform)
            </h2>
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-700 p-4 rounded text-center">
                        <span className="block text-gray-400 text-sm">Total Files</span>
                        <span className="text-xl font-bold">{project.terraform.files}</span>
                    </div>
                     <div className="bg-gray-700 p-4 rounded text-center">
                        <span className="block text-gray-400 text-sm">Total Resources</span>
                        <span className="text-xl font-bold">{project.terraform.resources}</span>
                    </div>
                     <div className="bg-gray-700 p-4 rounded text-center">
                        <span className="block text-gray-400 text-sm">Total CO2e</span>
                        <span className="text-xl font-bold text-green-400">{project.terraform.co2e.toFixed(2)}</span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">File</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Resources Found</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">CO2e</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {sortedTerraformDetails.map((detail, idx) => (
                                <tr key={idx} className="hover:bg-gray-700">
                                    <td className="px-6 py-4 text-sm font-mono text-gray-300">{detail.file}</td>
                                    <td className="px-6 py-4 text-sm text-gray-300">
                                        {detail.resources?.length || 0} resources
                                        {detail.resources && detail.resources.length > 0 && (
                                            <ul className="list-disc list-inside mt-1 text-xs text-gray-400">
                                                {detail.resources.map((r, i) => (
                                                    <li key={i}>{r.instanceType}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-green-400 font-mono">{detail.co2e.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
          </section>
        )}

        {/* Dependencies Section */}
        {project.dependencies.co2e > 0 && (
          <section>
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-green-300">
              Dependency Analysis (NPM)
            </h2>
             <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-700 p-4 rounded text-center">
                        <span className="block text-gray-400 text-sm">Total Files</span>
                        <span className="text-xl font-bold">{project.dependencies.files}</span>
                    </div>
                     <div className="bg-gray-700 p-4 rounded text-center">
                        <span className="block text-gray-400 text-sm">Total Dependencies</span>
                        <span className="text-xl font-bold">{project.dependencies.count}</span>
                    </div>
                     <div className="bg-gray-700 p-4 rounded text-center">
                        <span className="block text-gray-400 text-sm">Total CO2e</span>
                        <span className="text-xl font-bold text-green-400">{project.dependencies.co2e.toFixed(2)}</span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">File</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Dependencies</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">CO2e</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {sortedDependencyDetails.map((detail, idx) => (
                                <tr key={idx} className="hover:bg-gray-700">
                                    <td className="px-6 py-4 text-sm font-mono text-gray-300">{detail.file}</td>
                                    <td className="px-6 py-4 text-sm text-gray-300">
                                        {detail.count} total ({detail.dependencies} prod, {detail.devDependencies} dev)
                                    </td>
                                    <td className="px-6 py-4 text-sm text-green-400 font-mono">{detail.co2e.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}