import PageResponse from "./PageResponse";
import PostImage from "./PostImage";
import { UserData } from "./User";

export default interface Post {
  postId: number;
  content: string;
  timestamp: string;
}

export interface FetchAllUserPostsProps extends Post, UserData {
  postImages: PostImage[];
}

export default interface PostListResponse {
  postList: FetchAllUserPostsProps[];
  pageResponse: PageResponse;
}
