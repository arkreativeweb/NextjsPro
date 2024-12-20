import { Metadata } from 'next'
import ArticleDetailClient from './page.client'
import { getArticleBySlug } from "@/lib/api/article";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const article = await getArticleBySlug(params.slug);
    
    if (!article) {
      return {
        title: 'Artikel Tidak Ditemukan | Properti Premium Jakarta Selatan',
        description: 'Maaf, artikel yang Anda cari tidak tersedia'
      }
    }

    return {
      title: `${article.title} | Properti Premium Jakarta Selatan`,
      description: article.content.substring(0, 160),
      keywords: [
        'properti jakarta selatan',
        'rumah premium jaksel',
        ...(article.meta?.keywords?.split(',') || [])
      ],
      openGraph: {
        title: article.title,
        description: article.content.substring(0, 160),
        images: [
          {
            url: article.image || '/images/article-placeholder.jpg',
            width: 1200,
            height: 630,
            alt: article.title
          }
        ]
      }
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Error | Properti Premium Jakarta Selatan',
      description: 'Terjadi kesalahan saat memuat artikel'
    }
  }
}

export default function Page({ params }: { params: { slug: string } }) {
  return <ArticleDetailClient slug={params.slug} />
}