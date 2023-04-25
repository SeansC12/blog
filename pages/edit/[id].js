import React, { useState, useEffect } from 'react'
import Editor from '../../components/Editor'
import { query } from '../../lib/db';

function id({ data }) {
  const [blogData, setBlogData] = useState();

  useEffect(() => {
    setBlogData(data.blog)
  })

  return (
    <div>
      <Editor setBlogData={setBlogData} blogData={blogData} />
    </div>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  console.log(id)

  const sqlQuery = "SELECT blog_title, blog FROM blogs WHERE blog_id = ?";
  const valueParams = [id];

  let data;
  try {
    data = await query({ query: sqlQuery, values: valueParams });
  } catch (err) {
    throw Error(err);
  }

  return {
    props: {
      data: data[0],
    },
  };

}

export default id