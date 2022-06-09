import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { title } from 'process';
import {Categories , PostCard, PostWidget, Header} from '../components';
import {getPosts} from '../services/index';
import {FeaturedPosts} from '../sections';
import { Key } from 'react';

// import { GetStaticProps } from 'next';

function Home({ posts } : {posts :any}) {

  // posts.map((post) => {
  //   console.log(post.node);
  // })
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FeaturedPosts />
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-8 col-span-1'>
          {posts.map((post: { node: any; }, index: Key | null | undefined) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        <div className='lg:col-span-4 col-span-1'>
          <PostWidget categories={undefined} slug={undefined} />
          <Categories />
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(): Promise<{ props: { posts: any; }; }> {
  const posts = await getPosts();
  return { props : {posts }}
}

export default Home

