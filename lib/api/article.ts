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

const API_URL = 'http://localhost:8000/api';

export async function getArticles(): Promise<Article[]> {
  try {
    const response = await fetch(`${API_URL}/articles`, {
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }

    const data = await response.json();
    console.log('Articles data:', data);
    
    const articles = (data.data || []).map((article: any) => ({
      id: article.id,
      title: article.title || '',
      content: article.content || '',
      image: article.image || null,
      createdAt: article.created_at || new Date().toISOString(),
      author: article.user?.name || article.author || 'Anonim',
      slug: article.slug,
      is_published: article.is_published || false,
      published_at: article.published_at || null,
      meta: article.meta || {}
    }));

    return articles;
    
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

function formatContent(content: string): string {
  return content
    // Memastikan ada baris kosong antara paragraf
    .replace(/\n(?!\n)/g, '\n\n')
    // Memastikan format list yang benar
    .replace(/^(\d+\.|-)(?!\s)/gm, '$1 ')
    // Menambahkan spasi setelah tanda baca
    .replace(/([.,!?])(?!\s|$)/g, '$1 ')
    // Memastikan emoji memiliki spasi di sekitarnya
    .replace(/([^\s])([🏢🏙️🌆🏬💎🌿🚇🚎💼🏠📈])([^\s])/g, '$1 $2 $3')
    .replace(/([^\s])([🏢🏙️🌆🏬💎🌿🚇🚎💼🏠📈])/g, '$1 $2')
    .replace(/([🏢🏙️🌆🏬💎🌿🚇🚎💼🏠📈])([^\s])/g, '$1 $2');
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    console.log('Fetching article with slug:', slug);
    
    // Coba ambil semua artikel dulu
    const allArticles = await getArticles();
    console.log('All articles:', allArticles);

    // Cari artikel dengan slug yang sesuai
    const article = allArticles.find(article => article.slug === slug);
    console.log('Found article:', article);

    if (!article) {
      console.error('Article not found with slug:', slug);
      return null;
    }

    return {
      ...article,
      content: formatContent(article.content)
    };
    
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

// Helper function untuk transform data artikel
function transformArticleData(article: any): Article {
  return {
    id: article.id,
    title: article.title || '',
    content: article.content || '',
    image: article.image || null,
    createdAt: article.created_at || new Date().toISOString(),
    author: article.user?.name || article.author || 'Anonim',
    slug: article.slug,
    is_published: article.is_published || false,
    published_at: article.published_at || null,
    meta: article.meta || {}
  };
} 