interface IPostItem {
  post: IPost;
  onHandleDeletePost: (id: string) => void;
}
