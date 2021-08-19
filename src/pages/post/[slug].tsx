import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import Header from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';
import Prismic from '@prismicio/client'

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <Header />
      <h1>Página de post kkk..</h1>
    </>
  )
}

export const getStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query(
    Prismic.predicates.at('document.type','posts'),
    {});

    const paths = posts.results.map(post =>{
      return{
        params:{
          slug:post.uid
        }
      }
    })
  return {
    paths,
    fallback:false,
  }
};

export const getStaticProps = async ({ params }) => {
  const {slug} = params
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts',String(slug),{})


  const post = {
    first_publication_date:response.first_publication_date,
    data: {
      title: response.data.title,
      banner: {
        url:response.data.banner,
      },
      author:response.data.author,
      content:{
        heading:response.data.content,
        body:{
          // text:response.data.content.body,
        }
      }
    }
  }

  return {
    props:{post},
    redirect: 60 * 30
  }
};
