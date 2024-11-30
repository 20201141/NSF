export type Post = {
  post_id: number;
  username: string;
  title: string;
  date: string;
  post_type: string;
  content: string;
  isresolved: boolean;
  code: string | null;
  getnotif: boolean;
  tags: string;
};
