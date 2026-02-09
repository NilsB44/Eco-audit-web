"use client";

import auditResults from '@/lib/audit-results.json';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Leaf, 
  Server, 
  Package, 
  ArrowRight, 
  Github, 
  BarChart3, 
  Zap, 
  Globe 
} from 'lucide-react';

const topTerraform = auditResults
  .filter(result => result.terraform.co2e > 0)
  .sort((a, b) => b.terraform.co2e - a.terraform.co2e)
  .slice(0, 10);

const topDependencies = auditResults
  .filter(result => result.dependencies.co2e > 0)
  .sort((a, b) => b.dependencies.co2e - a.dependencies.co2e)
  .slice(0, 10);

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-50 selection:bg-emerald-500/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
              <Leaf size={20} />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">EcoStep</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <Link href="/" className="text-white transition-colors">Dashboard</Link>
            <Link href="/emissions" className="hover:text-emerald-400 transition-colors">Emissions Data</Link>
            <Link href="/examples" className="hover:text-emerald-400 transition-colors">Examples</Link>
          </div>
          <a href="https://github.com/NilsB44/CarbonCalculator" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 transition-colors">
            <Github size={16} />
            <span>GitHub</span>
          </a>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
          <div className="container mx-auto px-6 text-center">
            <div className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400 mb-8">
              <Zap size={14} className="mr-2" />
              <span>New: GitHub Action Available</span>
            </div>
            <h1 className="mx-auto mb-6 max-w-4xl text-5xl font-extrabold tracking-tight text-white md:text-7xl lg:text-8xl">
              Measure the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Environmental Cost</span> of Your Code
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-400 md:text-xl">
              EcoStep provides automated carbon auditing for software infrastructure and dependencies. Transition from estimated guess-work to actionable sustainability metrics.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="#audit-start" 
                className="flex items-center justify-center rounded-full bg-emerald-500 px-8 py-4 text-base font-bold text-slate-950 hover:bg-emerald-400 transition-all hover:scale-105"
              >
                Start Auditing <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link 
                href="/emissions" 
                className="flex items-center justify-center rounded-full border border-slate-700 bg-slate-800/50 px-8 py-4 text-base font-bold text-white hover:bg-slate-800 transition-all"
              >
                View Data References
              </Link>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/20 blur-[120px]" />
        </section>

        {/* Stats / ROI Calculator Teaser */}
        <section className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                <BarChart3 size={24} />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Visibility</h3>
              <p className="text-slate-400">
                Track carbon emissions across {auditResults.length} open-source repositories and your own private projects.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                <Leaf size={24} />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Reduction</h3>
              <p className="text-slate-400">
                Switching to ARM-based Graviton instances can reduce your cloud carbon footprint by up to <strong>20%</strong>.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                <Globe size={24} />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Compliance</h3>
              <p className="text-slate-400">
                Align your software supply chain with GHG Protocol standards for Scope 3 emissions reporting.
              </p>
            </div>
          </div>
        </section>

        {/* Hall of Fame Section */}
        <section className="container mx-auto px-6 py-16">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">Open Source Hall of Fame</h2>
            <p className="mt-4 text-slate-400">Analyzing the footprint of popular projects.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Infrastructure Table */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden">
              <div className="flex items-center gap-3 border-b border-slate-800 bg-slate-900/80 px-6 py-4">
                <Server className="text-emerald-400" size={20} />
                <h3 className="font-bold text-white">Infrastructure Impact</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-400">
                  <thead className="bg-slate-950/50 text-xs uppercase font-semibold text-slate-500">
                    <tr>
                      <th className="px-6 py-3">Project</th>
                      <th className="px-6 py-3 text-right">CO2e (Tonnes)</th>
                      <th className="px-6 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {topTerraform.map((result) => (
                      <tr key={result.project} className="hover:bg-slate-800/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-white">
                          <div className="flex items-center gap-2">
                            {result.terraform.co2e > 50 && <span title="High Impact" className="text-orange-500">🔥</span>}
                            {result.project}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right font-mono text-emerald-400">
                          {result.terraform.co2e.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link href={`/project/${result.project}`} className="text-emerald-400 hover:text-emerald-300 hover:underline">
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Dependency Table */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden">
              <div className="flex items-center gap-3 border-b border-slate-800 bg-slate-900/80 px-6 py-4">
                <Package className="text-blue-400" size={20} />
                <h3 className="font-bold text-white">Dependency Impact</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-400">
                  <thead className="bg-slate-950/50 text-xs uppercase font-semibold text-slate-500">
                    <tr>
                      <th className="px-6 py-3">Project</th>
                      <th className="px-6 py-3 text-right">CO2e (Tonnes)</th>
                      <th className="px-6 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {topDependencies.map((result) => (
                      <tr key={result.project} className="hover:bg-slate-800/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-white">
                          {result.project}
                        </td>
                        <td className="px-6 py-4 text-right font-mono text-blue-400">
                          {result.dependencies.co2e.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link href={`/project/${result.project}`} className="text-blue-400 hover:text-blue-300 hover:underline">
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* PR Report Preview */}
        <section className="container mx-auto px-6 py-16">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">👀 See it in Action</h2>
            <p className="mt-4 text-slate-400">Get detailed carbon reports directly in your Pull Request comments.</p>
          </div>
          <div className="mx-auto max-w-4xl rounded-2xl border border-slate-800 bg-slate-900 p-2 shadow-2xl">
            <Image 
              src="/images/pr-report.png" 
              alt="EcoStep GitHub Action Report Example" 
              className="rounded-xl w-full"
              width={1200}
              height={800}
            />
          </div>
        </section>

        {/* Audit Instructions */}
        <section id="audit-start" className="container mx-auto px-6 py-16">
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-8 md:p-12">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">🚀 Integrate EcoStep Audit</h2>
                <p className="text-slate-400 mb-8 text-lg">
                  Add our GitHub Action to your repository to get automatic carbon reports on every Pull Request. 
                  Monitor infrastructure changes and dependency bloat in real-time.
                </p>
                <div className="flex gap-4">
                  <a href="https://github.com/marketplace" className="rounded-full bg-white px-6 py-3 font-bold text-slate-900 hover:bg-slate-200 transition-colors">
                    View on Marketplace
                  </a>
                </div>
              </div>
              <div className="bg-slate-950 rounded-xl border border-slate-800 p-6 shadow-2xl">
                <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-4">
                  <span className="text-xs font-mono text-slate-500">.github/workflows/ecostep.yml</span>
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                  </div>
                </div>
                <pre className="text-sm font-mono text-blue-300 overflow-x-auto p-2">
{`name: Carbon Audit
on: [pull_request]

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: EcoStep Carbon Audit
        uses: NilsB44/CarbonCalculator@main
        with:
          github-token: \${{ secrets.GITHUB_TOKEN }}
          carbon-threshold: 50`}
                </pre>
              </div>
            </div>
            {/* Gradient Overlay */}
            <div className="absolute top-0 right-0 -z-0 h-full w-1/2 bg-gradient-to-l from-emerald-900/10 to-transparent" />
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 bg-slate-950 py-12">
        <div className="container mx-auto px-6 text-center text-slate-500">
          <div className="flex justify-center items-center gap-2 mb-4 text-emerald-500 opacity-80">
            <Leaf size={24} />
            <span className="text-xl font-bold">EcoStep</span>
          </div>
          <p className="mb-4">Open Source Carbon Calculator for Sustainable Software Engineering.</p>
          <p className="text-sm">&copy; {new Date().getFullYear()} EcoStep. Licensed under MIT.</p>
        </div>
      </footer>
    </div>
  );
}