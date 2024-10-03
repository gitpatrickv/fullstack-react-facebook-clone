import PageResponse from "./PageResponse";
import PostImage from "./PostImage";
import { UserData } from "./User";

export default interface Post extends UserData {
  postId: number;
  content: string;
  timestamp: string;
  postImages: PostImage[];
  sharedPost?: Post;
}

export default interface PostListResponse {
  postList: Post[];
  pageResponse: PageResponse;
}
