import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPH_PROJECT_API;
// lib/getComment.js
// submit user comment to GraphCMS
export const submitComment = async (obj) => {
  const result = await fetch('/api/comments',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj),
  })
  return result.json();
}


// getting post comments
export const getComments = async (slug) =>   {
    const query = gql`
        query GetComments($slug: String!) {
            comments(where: { post: { slug: $slug } }) {
                name
                createdAt
                comment
            }
        }
    `
    const result = await request(graphqlAPI,query, { slug });
    return result.comments;
}

