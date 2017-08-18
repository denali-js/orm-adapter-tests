import { RegisterContextual } from 'ava';

export default function querying(test: RegisterContextual<any>) {

  // -----------------
  // #getRelated()
  // -----------------

  test('#getRelated() asynchronously fetches related records', async (t) => {
    let { db } = t.context;
    let post = await db.create('post', { title: 'Hello World' }).save();
    let commentOne = await db.create('comment', { body: 'Great post' }).save();
    let commentTwo = await db.create('comment', { body: 'Terrible post' }).save();
    await post.setComments([ commentOne, commentTwo ]);
    
    let result = await db.find('post', post.id);
    let commentsResult = await result.getComments();
    t.is(commentsResult.length, 2);
    t.is(commentsResult[0].body, 'Great post');
  });

  // -----------------
  // #setRelated()
  // -----------------

  test('#setRelated() asynchronously replaces all existing related records', async (t) => {
    let { db } = t.context;
    let post = await db.create('post', { title: 'Hello World' }).save();
    let commentOne = await db.create('comment', { body: 'Great post' }).save();
    let commentTwo = await db.create('comment', { body: 'Terrible post' }).save();
    let commentThree = await db.create('comment', { body: 'Medicore post' }).save();
    await post.setComments([ commentOne, commentTwo ]);
    
    post = await db.find('post', post.id);
    await post.setComments([ commentThree ]);
    let comments = await post.getComments();
    t.is(comments.length, 1);
    t.is(comments[0].body, 'Medicore post');
  });

  // -----------------
  // #addRelated()
  // -----------------

  test('#addRelated() asynchronously adds one record to a has many relationship', async (t) => {
    let { db } = t.context;
    let post = await db.create('post', { title: 'Hello World' }).save();
    let commentOne = await db.create('comment', { body: 'Great post' }).save();
    let commentTwo = await db.create('comment', { body: 'Terrible post' }).save();
    await post.setComments([ commentOne ]);
    
    post = await db.find('post', post.id);
    await post.addComment(commentTwo);
    let comments = await post.getComments();
    t.is(comments.length, 2);
    t.is(comments[1].body, 'Terrible post');
  });

  // -----------------
  // #removeRelated()
  // -----------------

  test('#removeRelated() asynchronously removes one record from a has many relationship', async (t) => {
    let { db } = t.context;
    let post = await db.create('post', { title: 'Hello World' }).save();
    let commentOne = await db.create('comment', { body: 'Great post' }).save();
    let commentTwo = await db.create('comment', { body: 'Terrible post' }).save();
    await post.setComments([ commentOne, commentTwo ]);
    
    post = await db.find('post', post.id);
    await post.removeComment(commentTwo);
    let comments = await post.getComments();
    t.is(comments.length, 1);
    t.is(comments[0].body, 'Great post');
  });

}