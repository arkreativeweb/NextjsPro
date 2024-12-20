import Link from 'next/link';

interface ArticleCardProps {
  article: {
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
  };
}

export default function ArticleCard({ article }: ArticleCardProps) {
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
          <time className="text-gray-500" dateTime={article.created_at}>
            {new Date(article.created_at).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </time>
        </div>
      </div>
    </Link>
  );
} 