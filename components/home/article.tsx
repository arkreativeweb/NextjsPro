'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Article {
  id: number;
  title: string;
  slug: string;
  image: string;
  meta: {
    description: string;
  };
  user: {
    name: string;
  };
  created_at: string;
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link 
      href={`/artikel/${article.slug}`}
      className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all"
    >
      <div className="relative h-48">
        <img 
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {article.meta.description}
        </p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">{article.user.name}</span>
          <span className="text-gray-500">
            {new Date(article.created_at).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short'
            })}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ArticleSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function getArticles() {
      try {
        const response = await fetch('https://admin.arearumah.com/api/articles');
        const data = await response.json();
        
        if (mounted && data.data) {
          setArticles(data.data.slice(0, 3));
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error:', error);
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    getArticles();

    return () => {
      mounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Artikel Properti Terbaru
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow animate-pulse">
                <div className="h-40 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Artikel Properti Terbaru
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link 
            href="/artikel"
            className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Lihat Semua Artikel
          </Link>
        </div>
      </div>
    </section>
  );
} 