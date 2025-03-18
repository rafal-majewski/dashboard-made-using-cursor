import DashboardStats from '@/components/DashboardStats';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-zinc-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white">Dashboard</h1>
        <DashboardStats />
      </div>
    </main>
  );
} 