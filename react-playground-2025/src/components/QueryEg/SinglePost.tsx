import { useFetchSingleEg } from "../../hooks/useQueryEg";

const SinglePost = ({ id }: { id: number }) => {
  const { data: post, isPending: isSinglePostPending, error: singlePostError } = useFetchSingleEg(id);

  if (isSinglePostPending) return <div>Loading...</div>;

  if (singlePostError) return <div>Error: {singlePostError.message}</div>;
    
  return <div style={{ border: "1px solid lime", padding: "10px" }}>
    <h3>{post.title}</h3>
    <p>{post.userId}</p>
    <p>{post.body}</p>
  </div>;
};

export default SinglePost;
