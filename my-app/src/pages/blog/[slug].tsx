import { useRouter } from "next/router";

const BlogPost = () => {
  const { query } = useRouter();

  return (
    <div>
      <h1>Halaman Blog</h1>
      <p>Post: {query.slug}</p>
    </div>
  );
};

export default BlogPost;
