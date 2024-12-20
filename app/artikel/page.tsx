import Image from 'next/image'
import Link from 'next/link'
import { getArticles } from "../../lib/api/article";
import { Metadata } from 'next'

// Definisikan interface untuk artikel
interface Article {
  id: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  author: string | null;
  meta?: {
    title?: string;
    description?: string;
    keywords?: string;
  };
  slug: string;
  is_published?: boolean;
  published_at?: string | null;
}

// Gunakan generateMetadata untuk SEO
export const metadata: Metadata = {
  title: 'Artikel & Panduan Properti Jakarta Selatan',
  description: 'Tips dan panduan lengkap seputar properti Jakarta Selatan. Informasi investasi, area premium, perkembangan properti, dan analisis pasar terkini.',
  keywords: [
    'panduan properti jakarta selatan',
    'tips beli rumah jaksel',
    'investasi properti premium',
    'analisis pasar properti',
    'perkembangan properti jaksel',
    'area premium jakarta selatan'
  ]
}

// Gunakan unstable_noStore untuk menghindari caching
import { unstable_noStore as noStore } from 'next/cache';

async function ArtikelPage() {
  noStore();
  let articles;
  
  try {
    articles = await getArticles();
    console.log('Articles fetched:', articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-red-600">Terjadi kesalahan saat memuat artikel</p>
        </div>
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-gray-600">Belum ada artikel yang tersedia</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Artikel Properti Terkini</h1>
          <p className="text-gray-600">Temukan informasi dan wawasan seputar properti dalam artikel-artikel pilihan</p>
        </div>

        {/* Featured Article */}
        {articles.length > 0 && (
          <div className="mb-12">
            <Link href={`/artikel/${articles[0].slug}`} className="group">
              <div className="relative rounded-2xl overflow-hidden">
                <div className="aspect-[21/9] relative">
                  <Image
                    src={articles[0].image || '/images/placeholder.jpg'}
                    alt={articles[0].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    priority
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                  <div className="absolute bottom-0 p-6 md:p-8">
                    <div className="mb-4">
                      <span className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-full">
                        Featured
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                      {articles[0].title}
                    </h2>
                    <p className="text-gray-300 line-clamp-2 mb-4">
                      {articles[0].content}
                    </p>
                    <div className="flex items-center text-white/80">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                          <span className="text-indigo-600 font-semibold">
                            {articles[0].author ? articles[0].author.charAt(0) : '?'}
                          </span>
                        </div>
                        <span>{articles[0].author || 'Anonim'}</span>
                      </div>
                      <span className="mx-2">•</span>
                      <time>{new Date(articles[0].createdAt).toLocaleDateString('id-ID')}</time>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Grid Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(1).map((article: Article) => (
            <Link 
              href={`/artikel/${article.slug}`}
              key={article.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative h-48">
                <Image
                  src={article.image || '/images/placeholder.jpg'}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {article.content}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-600 font-semibold">
                        {article.author ? article.author.charAt(0) : '?'}
                      </span>
                    </div>
                    <span className="text-gray-600">
                      {article.author || 'Anonim'}
                    </span>
                  </div>
                  <time className="text-gray-500">
                    {new Date(article.createdAt).toLocaleDateString('id-ID')}
                  </time>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArtikelPage;
