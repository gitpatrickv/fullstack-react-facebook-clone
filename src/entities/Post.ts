import PageResponse from "./PageResponse";
import PostImage from "./PostImage";
import { UserData } from "./User";

export interface PostModel {
  postId: number;
  content: string;
  timestamp: string;
  postImages: PostImage[];
}

export interface SharedPostResponse extends PostModel, UserData {}

export default interface Post extends PostModel, UserData {
  sharedPost?: SharedPostResponse;
  sharedImage?: PostImage;
}

export default interface PostListResponse {
  postList: Post[];
  pageResponse: PageResponse;
}
