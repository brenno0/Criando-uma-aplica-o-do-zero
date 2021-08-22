import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import Header from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';
import Prismic from '@prismicio/client'
import format from 'date-fns/format';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import { Head } from 'next/document';
import { RichText } from 'prismic-dom';
import { ptBR } from 'date-fns/locale';

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
      <img className={styles.fullWidth} src={post.data.banner.url} alt="" />

      <div className={styles.container}>



      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
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
    fallback:true,
  }
};

export const getStaticProps: GetStaticProps = async context => {
  const {slug} = context.params
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts',String(slug),{})

  const post = {
    first_publication_date:response.first_publication_date,
    uid:response.uid,
    data:{
      title:response.data.title,
      subtitle:response.data.subtitle,
      author:response.data.author,
      banner:{
        url:response.data.banner.url,
      },
      content:response.data.content.map(content =>{
        return {
          body:[...content.body],
          heading:content.heading
        }
      })
    }
  }
  //   title: string;
  //   url: string;
  //   author: string;
  //   heading: string;
  //   text: string;

  return {
    props:{post},

  }
};
