import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Mock data structure for articles
const articles = [
  {
    id: 1,
    title: "MY DEVELOPER BLOCKCHAIN DISCOVERIES",
    excerpt: "Learn the basics of Blockchain.",
    date: "2023-09-15",
    readTime: "5 min read",
    notionLink: "https://www.notion.so/Embarking-on-Blockchain-My-Developer-Discoveries-DAY2-708f2536667e4a40af4bfeb809b579c5",
    imageUrl: "/images/haleem.jpg"
  },
  {
    id: 2,
    title: "Advanced React Patterns",
    excerpt: "Dive deep into advanced React patterns to level up your development skills.",
    date: "2023-09-20",
    readTime: "8 min read",
    notionLink: "https://www.notion.so/article2",
    imageUrl: "/images/haleem.jpg"
  },
  {
    id: 3,
    title: "Mastering Tailwind CSS",
    excerpt: "Unlock the full potential of Tailwind CSS in your projects.",
    date: "2023-09-25",
    readTime: "6 min read",
    notionLink: "https://www.notion.so/article3",
    imageUrl: "/images/haleem.jpg"
  },
  {
    id: 4,
    title: "State Management in React",
    excerpt: "Explore different state management solutions for your React applications.",
    date: "2023-09-30",
    readTime: "7 min read",
    notionLink: "https://www.notion.so/article4",
    imageUrl: "/images/haleem.jpg"
  },
  {
    id: 5,
    title: "Building Accessible Web Apps",
    excerpt: "Learn how to create web applications that are accessible to all users.",
    date: "2023-10-05",
    readTime: "9 min read",
    notionLink: "https://www.notion.so/article5",
imageUrl: "/images/haleem.jpg"
  },
  {
    id: 6,
    title: "Optimizing Next.js Performance",
    excerpt: "Discover techniques to improve the performance of your Next.js applications.",
    date: "2023-10-10",
    readTime: "10 min read",
    notionLink: "https://www.notion.so/article6",
  imageUrl: "/images/haleem.jpg"
  }
]

export default function ArticlesPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Latest Articles</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {articles.map((article) => (
          <Card key={article.id} className="flex flex-col h-full">
            <div className="relative w-full pt-[66.67%]">
              <Image
                src={article.imageUrl}
                alt={article.title}
                width={300}  // Set the width
                height={200} // Set the height
            style={{ objectFit: 'cover' }}
                className="rounded-t-lg"
              />
            </div>
            <CardHeader className="p-4">
              <CardTitle className="text-sm font-semibold line-clamp-2">{article.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-grow">
              <p className="text-xs text-muted-foreground line-clamp-3">{article.excerpt}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex flex-col items-start gap-2">
              <div className="text-xs text-muted-foreground">
                <time dateTime={article.date}>{article.date}</time> • {article.readTime}
              </div>
              <Button asChild size="sm" className="w-full">
                <Link href={article.notionLink} target="_blank" rel="noopener noreferrer">
                  Read on Notion
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}