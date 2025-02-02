export type Comment = {
  'id': string,
  'userName': string,
  'advantage': string,
  'disadvantage': string,
  'comment': string,
  'rating': number,
  'createAt': string,
  'guitarId': number,
};

export type CommentPost = {
  'guitarId': number,
  'userName': string,
  'advantage': string,
  'disadvantage': string,
  'comment': string,
  'rating': number,
}

export type Comments = Comment[];
