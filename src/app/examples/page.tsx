import Link from 'next/link';

export default function ExamplesPage() {
  const examples = [
    {
      provider: 'AWS',
      title: 'Standard Web Server',
      code: `resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "m5.xlarge"

  tags = {
    Name = "WebServer"
  }
}`,
      analysis: {
        instanceType: 'm5.xlarge',
        vCPU: 4,
        memory: '16 GiB',
        co2e_per_month: 58.4,
        description: 'General purpose instance suitable for web servers.'
      }
    },
    {
      provider: 'Google Cloud',
      title: 'High-Mem Database Node',
      code: `resource "google_compute_instance" "db" {
  name         = "db-node-1"
  machine_type = "n1-highmem-8"
  zone         = "us-central1-a"

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-9"
    }
  }
}`,
      analysis: {
        instanceType: 'n1-highmem-8',
        vCPU: 8,
        memory: '52 GiB',
        co2e_per_month: 116.8, 
        description: 'Memory-optimized machine for database workloads. (Est. based on vCPU)'
      }
    },
    {
      provider: 'Azure',
      title: 'Compute Cluster Node',
      code: `resource "azurerm_linux_virtual_machine" "cluster" {
  name                = "cluster-vm"
  size                = "Standard_D4s_v3"
  admin_username      = "adminuser"
  location            = "East US"
}`,
      analysis: {
        instanceType: 'Standard_D4s_v3',
        vCPU: 4,
        memory: '16 GiB',
        co2e_per_month: 58.4,
        description: 'General purpose compute node.'
      }
    }
  ];

  return (
    <main className="flex min-h-screen flex-col items-center p-8 sm:p-12 md:p-24 bg-gray-900 text-white">
      <div className="w-full max-w-6xl p-8 space-y-12">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-blue-400 hover:text-blue-300 underline mb-4 inline-block">
            &larr; Back to Dashboard
          </Link>
        </div>

        <header className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-green-400">Terraform Examples</h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            See how EcoStack analyzes common infrastructure configurations from different cloud providers.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-12">
          {examples.map((ex) => (
            <section key={ex.provider} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
              <div className="bg-gray-700 px-6 py-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">{ex.provider} <span className="text-gray-400 text-lg font-normal">- {ex.title}</span></h2>
                <span className="px-3 py-1 bg-green-900 text-green-300 text-xs font-bold uppercase rounded-full">Analyzed</span>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Code Snippet */}
                <div className="p-6 bg-gray-900 overflow-x-auto border-b lg:border-b-0 lg:border-r border-gray-700">
                  <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Terraform Config</h3>
                  <pre className="text-sm font-mono text-blue-300">
                    <code>{ex.code}</code>
                  </pre>
                </div>

                {/* Analysis Result */}
                <div className="p-6">
                  <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">EcoStack Analysis</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                      <span className="text-gray-300">Detected Resource</span>
                      <span className="font-mono text-white">{ex.analysis.instanceType}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                      <span className="text-gray-300">Specifications</span>
                      <span className="text-gray-400">{ex.analysis.vCPU} vCPU / {ex.analysis.memory}</span>
                    </div>
                     <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                      <span className="text-gray-300">Estimated Impact</span>
                      <span className="font-bold text-green-400">{ex.analysis.co2e_per_month} kg CO2e / month</span>
                    </div>
                    <p className="text-sm text-gray-400 italic mt-4">
                      &quot;{ex.analysis.description}&quot;
                    </p>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
        
        <div className="text-center pt-8">
            <Link 
              href="/emissions" 
              className="inline-block px-6 py-3 text-sm font-semibold text-gray-900 bg-blue-400 rounded-full hover:bg-blue-300 transition-colors duration-200"
            >
              Compare All Instance Types
            </Link>
        </div>

      </div>
    </main>
  );
}
