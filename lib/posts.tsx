import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html'


const postsDirectory = path.join(process.cwd(), 'blogposts')

export function getSortedPostsData() {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((filename) => {
        const id = filename.replace(/\.md$/,'')

        const fullPath = path.join(postsDirectory, filename)
        const fileContents = fs.readFileSync(fullPath, 'utf-8')

        const matterResult= matter(fileContents);

        const blogpost : BlogPost = {
            id,
            title: matterResult.data.title,
            date: matterResult.data.date
        }

        return blogpost;
    })

    return allPostsData.sort((a,b) => a.date < b.date ? 1 : -1)
}

export async function getPostData(id: string) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);

    const contentHtml = processedContent.toString();

    //new type no need of a new type to be defined
    const blogPostWithHTML: BlogPost & { contentHtml: string } = {
        id,
        title: matterResult.data.title,
        date: matterResult.data.date,
        contentHtml,
    }

    // Combine the data with the id
    return blogPostWithHTML
}