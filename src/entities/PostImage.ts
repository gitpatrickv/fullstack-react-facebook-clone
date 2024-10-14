import PageResponse from "./PageResponse";

export default interface PostImage {
  postImageId: number;
  postImageUrl: string;
  timestamp: string;
}

export default interface PhotoListResponse {
  postImageModels: PostImage[];
  pageResponse: PageResponse;
}
