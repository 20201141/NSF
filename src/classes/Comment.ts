export type Comment = {
  content: string;
  date: string | number; // will be parsed into a Date object when used.
  likes: number;
  username: string;

  parent_id: number | null;
};