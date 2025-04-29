import { useState } from "react";
import { useMultipleFetchEg } from "../../hooks/useQueryEg";
import SinglePost from "./SinglePost";
import { PostProps } from "../../types/common";

const QueryEg = () => {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  // const { data: posts, isPending, error, refetch } = useFetchEg();

  const [{ data: posts, isPending, error, refetch }, { data: todos, isPending: todosIsPending, error: todosError }] = useMultipleFetchEg();

  const handleRefetch = () => {
    refetch();
  }

  const handlePostClick = (id: number) => {
    setSelectedPostId(id);
  }

  if (isPending || todosIsPending) return <div>Loading...</div>;

  if (error || todosError) return <div>Error: {error?.message || todosError?.message}</div>;

  console.log("todos data: ", todos);

  return <div>
    {posts.slice(0, 2).map((post: PostProps) => (
      <div key={post.id}>
        <h3 onClick={() => handlePostClick(post.id)}>{post.title}</h3>
      </div>
    ))}
    
    {selectedPostId && <SinglePost id={selectedPostId} />}

    <button onClick={handleRefetch}>Refetch Posts</button>
  </div>;
};

export default QueryEg;
