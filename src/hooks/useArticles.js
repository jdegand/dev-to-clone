import { useQuery } from "react-query";

const getPosts = async () => {
    const res = await fetch(`https://dev.to/api/articles`); //?page=${page}
    if (!res.ok) {
        throw new Error('Network response failed')
    }
    return res.json();
};

export default function usePosts() {
  return useQuery("posts", getPosts);
}
