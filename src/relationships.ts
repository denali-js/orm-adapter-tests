import { RegisterContextual } from 'ava';

export default function querying(test: RegisterContextual<any>) {

  // -----------------
  // #getRelated()
  // -----------------

  test('#getRelated() asynchronously fetches related records', async (t) => {
    let { lookup } = t.context;
    let Post = lookup('model:post');
    let Comment = lookup('model:comment');
    let post = await Post.create({ title: 'Hello World' });
    let commentOne = await Comment.create({ body: 'Great post' });
    let commentTwo = await Comment.create({ body: 'Terrible post' });
    await post.setComments([ commentOne, commentTwo ]);

    let result = await Post.find(post.id);
    let commentsResult = await result.getComments();
    t.is(commentsResult.length, 2);
    t.is(commentsResult[0].body, 'Great post');
  });

  // -----------------
  // #setRelated()
  // -----------------

  test('#setRelated() asynchronously replaces all existing related records', async (t) => {
    let { lookup } = t.context;
    let Post = lookup('model:post');
    let Comment = lookup('model:comment');
    let post = await Post.create({ title: 'Hello World' });
    let commentOne = await Comment.create({ body: 'Great post' });
    let commentTwo = await Comment.create({ body: 'Terrible post' });
    let commentThree = await Comment.create({ body: 'Medicore post' });
    await post.setComments([ commentOne, commentTwo ]);

    post = await Post.find(post.id);
    await post.setComments([ commentThree ]);
    let comments = await post.getComments();
    t.is(comments.length, 1);
    t.is(comments[0].body, 'Medicore post');
  });

  // -----------------
  // #addRelated()
  // -----------------

  test('#addRelated() asynchronously adds one record to a has many relationship', async (t) => {
    let { lookup } = t.context;
    let Post = lookup('model:post');
    let Comment = lookup('model:comment');
    let post = await Post.create({ title: 'Hello World' });
    let commentOne = await Comment.create({ body: 'Great post' });
    let commentTwo = await Comment.create({ body: 'Terrible post' });
    await post.setComments([ commentOne ]);

    post = await Post.find(post.id);
    await post.addComment(commentTwo);
    let comments = await post.getComments();
    t.is(comments.length, 2);
    t.is(comments[1].body, 'Terrible post');
  });

  // -----------------
  // #removeRelated()
  // -----------------

  test('#removeRelated() asynchronously removes one record from a has many relationship', async (t) => {
    let { lookup } = t.context;
    let Post = lookup('model:post');
    let Comment = lookup('model:comment');
    let post = await Post.create({ title: 'Hello World' });
    let commentOne = await Comment.create({ body: 'Great post' });
    let commentTwo = await Comment.create({ body: 'Terrible post' });
    await post.setComments([ commentOne, commentTwo ]);

    post = await Post.find(post.id);
    await post.removeComment(commentTwo);
    let comments = await post.getComments();
    t.is(comments.length, 1);
    t.is(comments[0].body, 'Great post');
  });

}