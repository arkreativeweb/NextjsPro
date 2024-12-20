'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { getArticleBySlug } from "@/lib/api/article";

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
}

interface ArticleDetailClientProps {
  slug: string;
}

const formatContentWithEmoji = (content: string) => {
  const emojiMap: { [key: string]: string } = {
    '🏢': '&#x1F3E2;', 
    '🏙️': '&#x1F3D9;', 
    '🌆': '&#x1F306;', 
    '🏬': '&#x1F3EC;', 
    '💎': '&#x1F48E;', 
    '🌿': '&#x1F33F;', 
    '🚇': '&#x1F687;', 
    '🚎': '&#x1F68E;', 
    '💼': '&#x1F4BC;', 
    '🏠': '&#x1F3E0;', 
    '📈': '&#x1F4C8;', 
  };

  let formattedContent = content
    .split('\n\n')
    .map(paragraph => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)
    .join('');

  Object.entries(emojiMap).forEach(([emoji, entity]) => {
    formattedContent = formattedContent.replace(new RegExp(emoji, 'g'), entity);
  });

  return formattedContent;
};

const ArticleDetailClient = ({ slug }: ArticleDetailClientProps) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const fetchedArticle = await getArticleBySlug(slug);
        
        if (!fetchedArticle) {
          setError('Artikel tidak ditemukan');
        } else {
          setArticle(fetchedArticle);
        }
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Terjadi kesalahan saat memuat artikel');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-16 flex justify-center items-center">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 w-64 mb-4 rounded"></div>
          <div className="h-6 bg-gray-200 w-48 mb-4 rounded"></div>
          <div className="h-96 bg-gray-200 w-full rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || 'Artikel Tidak Ditemukan'}
          </h1>
          <Link 
            href="/artikel" 
            className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Kembali ke Daftar Artikel
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image Section */}
      {article.image && (
        <div className="w-full h-[60vh] relative">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent">
            <div className="max-w-4xl mx-auto h-full px-4 flex items-end pb-16">
              <div className="text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                  {article.title}
                </h1>
                <div className="flex items-center gap-6 text-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-600 font-semibold text-lg">
                        {article.author ? article.author.charAt(0) : '?'}
                      </span>
                    </div>
                    <span className="text-lg">{article.author || 'Anonim'}</span>
                  </div>
                  <span>•</span>
                  <time className="text-lg">
                    {new Date(article.createdAt).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-indigo-600 transition-colors">
            Beranda
          </Link>
          <span className="mx-2">/</span>
          <Link href="/artikel" className="hover:text-indigo-600 transition-colors">
            Artikel
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 line-clamp-1">{article.title}</span>
        </nav>

        {/* If no hero image, show title here */}
        {!article.image && (
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-600 font-semibold text-lg">
                    {article.author ? article.author.charAt(0) : '?'}
                  </span>
                </div>
                <span className="text-lg">{article.author || 'Anonim'}</span>
              </div>
              <span>•</span>
              <time className="text-lg">
                {new Date(article.createdAt).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
          </div>
        )}

        {/* Article Content */}
        <article className="prose prose-lg max-w-none prose-indigo">
          <div 
            dangerouslySetInnerHTML={{ 
              __html: formatContentWithEmoji(article.content)
            }}
            className="
              prose-headings:text-gray-900 
              prose-p:text-gray-600 
              prose-p:mb-4
              prose-a:text-indigo-600 
              prose-a:no-underline 
              hover:prose-a:underline 
              prose-img:rounded-xl 
              prose-strong:text-gray-900
              prose-li:text-gray-600
              prose-ul:my-6
              prose-ol:my-6
              prose-hr:my-8
              [&>p]:leading-relaxed
              [&>p]:mb-6
              [&>br]:mb-4
              [&_ul]:space-y-2
              [&_ol]:space-y-2
              [&_li]:ml-4
              [&_emoji]:text-2xl
              [&_emoji]:align-middle
              [&_emoji]:inline-block
              [&_emoji]:leading-none
            "
          />
        </article>

        {/* Meta Information */}
        {article.meta?.keywords && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-sm font-semibold text-gray-600 mb-4">TAGS</h2>
            <div className="flex flex-wrap gap-2">
              {article.meta.keywords.split(',').map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                >
                  {keyword.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Back to Articles */}
        <div className="mt-12 text-center">
          <Link
            href="/artikel"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span>Kembali ke Daftar Artikel</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailClient; 