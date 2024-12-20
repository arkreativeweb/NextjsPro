export const metadata = {
  title: 'Lokasi Properti - Temukan Properti di Area Strategis',
  description: 'Jelajahi berbagai properti di lokasi strategis untuk hunian atau investasi Anda',
}

export default function LocationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
} 