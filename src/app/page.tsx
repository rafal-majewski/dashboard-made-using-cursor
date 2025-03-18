import DashboardStats from '@/components/DashboardStats';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Dashboard</h1>
        <DashboardStats />
      </div>
    </main>
  );
} 