import PageResponse from "./PageResponse";
import PostImage from "./PostImage";

export default interface Post {
  postId: number;
  content: string;
  timestamp: string;
}

export interface FetchAllUserPostsProps extends Post {
  firstName: string;
  lastName: string;
  profilePicture?: string;
  postImages: PostImage[];
}

export default interface PostListResponse {
  postList: FetchAllUserPostsProps[];
  pageResponse: PageResponse;
}
