import { UserData } from "./User";

export interface StoryModel {
  storyId: number;
  text?: string;
  storyImage?: string;
}

export interface StoryResponse extends UserData {
  storyModels: StoryModel[];
}
