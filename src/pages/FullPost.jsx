import React from "react";
import { useParams } from "react-router-dom";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from '../axios';
import ReactMarkdown from "react-markdown";

export const FullPost = () => {
    const [data, setData ] = React.useState();
    const [isLoading, setLoading ] = React.useState(true);
    const { id } = useParams();

    React.useEffect(() => { axios.get(`/posts/${id}`).then(res => {
            setData(res.data);
            setLoading(false);
        })
        .catch((err) => {
            console.warn(err);
            alert('Ошибка при получении публикации')
        });
    }, []);

    if(isLoading) {
        return <Post isLoading={isLoading} isFullPost />;
    }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children = {data.text} />
      </Post>
      <CommentsBlock
        items={[
            {
              user: {
                fullName: 'Алина Фомина',
                avatarUrl: '',
              },
              text: 'Очень удобный веб-сайт!',
            },
            {
              user: {
                fullName: 'Олег Ройник',
                avatarUrl: '',
              },
              text: 'Много интересного контента)))',
            },
          ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
