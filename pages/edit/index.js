import React from 'react'
import EditBlogCard from '../../components/EditBlogCard'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { query } from "./../../lib/db"

function index({ data }) {
  return (
    <div className="px-96 flex items-center justify-center flex-col">
      <div className="font-bold text-4xl">My blogs</div>
      {data.map((blog, key) => {
        return (
          <div key={key}>
            <EditBlogCard blogTitle={blog.blog_title} blogDescription={blog.description} blogID={blog.blog_id} />
          </div>
        )
      })}
    </div>
  )
}

export async function getServerSideProps(context) {
  const supabaseClient = createServerSupabaseClient(context);
  const {
    data: { session },
  } = await supabaseClient.auth.getSession()

  if (!session) {
    return {
      redirect: {
        destination: '/Login',
        permanent: false,
      },
    }
  }

  const sqlQuery =
    "SELECT blog_id, blog_title, description FROM blogs WHERE blogs.person_id = ?;";
  const valueParams = [session.user.id];

  let data;
  try {
    data = await query({ query: sqlQuery, values: valueParams });
  } catch (err) {
    throw Error(err)
  }

  return {
    props: {
      data: data,
    },
  };
}

export default index