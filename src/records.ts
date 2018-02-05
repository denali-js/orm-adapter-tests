import { RegisterContextual } from 'ava';

export default function querying(test: RegisterContextual<any>) {

  // -----------------
  // #idFor()
  // -----------------

  test('#idFor() returns the id for the record', async (t) => {
    let { lookup } = t.context;
    let Post = lookup('model:post');
    let { id } = await Post.create({ title: 'one' });

    let post = await Post.find(id);

    t.is(post.id, id);
  });

  // -----------------
  // #getAttribute()
  // -----------------

  test('#getAttribute() returns the value of the given attriute', async (t) => {
    let { lookup } = t.context;
    let Post = lookup('model:post');
    let { id } = await Post.create({ title: 'one' });

    let post = await Post.find(id);

    t.is(post.title, 'one');
  });

  // -----------------
  // #setAttribute()
  // -----------------

  test('#setAttribute() sets the value of the given attriute', async (t) => {
    let { lookup } = t.context;
    let Post = lookup('model:post');
    let { id } = await Post.create({ title: 'one' });

    let post = await Post.find(id);
    post.title = 'two';

    t.is(post.title, 'two');
  });

}
