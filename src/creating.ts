import { RegisterContextual } from 'ava';

export default function querying(test: RegisterContextual<any>) {

  // -----------------
  // #create()
  // -----------------

  test('#createRecord() saves a record', async (t) => {
    let { lookup } = t.context;
    let Post = lookup('model:post');

    let post = await Post.create({ title: 'one' });

    let result = await Post.find(post.id);
    t.truthy(result);
    t.is(result.id, 1);
    t.is(result.title, 'one');
  });

}