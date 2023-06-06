import { getPostData, getSortedPostsData } from '@/lib/posts'
import React from 'react'
import { notFound } from 'next/navigation'
import getFormattedDate from '@/lib/getFormattedDate';
import Link from 'next/link';


export function generateMetadata({params} : { params: { postId: string}}) {
    const posts = getSortedPostsData() // deduped
    const { postId } = params;

    const post = posts.find(post => post.id == postId)
    if(!post)
    {
        return {
            title: 'Post Not Found'
        }
    }
    return {
        title: post?.title
    };
    
}
export function generateStaticParams() {
    const posts = getSortedPostsData() // deduped
    return posts.map((post) => {
        postId: post.id
    })
}
export default async function Post({params} : { params: { postId: string}}) {
    const posts = getSortedPostsData() // deduped
    const { postId } = params;

    if(!posts.find(post => post.id == postId))
    {
        return notFound();
    }
    const { title, date, contentHtml } = await getPostData(postId)
    const betterDate = getFormattedDate(date)

  return (
    <main className="px-6 prose prose-xl prose-slate dark:prose-invert mx-auto">
        <h1 className="text-3xl mt-4mb-0">
            {title}
        </h1>
        <p className="mt-0">
            {betterDate}
        </p>
        <article>
            <section dangerouslySetInnerHTML={{__html:contentHtml}} />
            <p>
                <Link href="/">
                   Back to home
                </Link>
            </p>
        </article>
    </main>
  )
}
