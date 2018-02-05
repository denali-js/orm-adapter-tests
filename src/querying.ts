import { RegisterContextual } from 'ava';

export default function querying(test: RegisterContextual<any>) {

  // -----------------
  // #find()
  // -----------------

  test('#find() returns the requested record', async (t) => {
    let { lookup } = t.context;
    let Post = lookup('model:post');

    let post = await Post.create({ title: 'one' });

    let result = await Post.find(post.id);
    t.truthy(result);
    t.is(result.id, 1);
    t.is(result.title, 'one');
  });

  test('#find() returns null if not found', async (t) => {
    let { lookup } = t.context;
    let Post = lookup('model:post');

    let result = await Post.find('non-existent-id');
    t.is(result, null);
  });

  // -----------------
  // #queryOne()
  // -----------------

  test('#queryOne() returns the matching record with basic filter syntax', async (t) => {
    let { lookup } = t.context;
    let Post = lookup('model:post');
    await Post.create({ title: 'one' });

    let result = await Post.queryOne({ title: 'one' });
    t.truthy(result);
    t.is(result.id, 1);
    t.is(result.title, 'one');
  });

  test('#queryOne() returns null if not found', async (t) => {
    let { lookup } = t.context;
    let Post = lookup('model:post');

    let result = await Post.queryOne({ foo: 'bar' });
    t.is(result, null);
  });

  // -----------------
  // #query()
  // -----------------

  test('#query() returns the matching records with basic filter syntax', async (t) => {
    let { lookup } = t.context;
    let Post = lookup('model:post');
    await Post.create({ title: 'hello' });
    await Post.create({ title: 'hello' });
    await Post.create({ title: 'hello' });
    await Post.create({ title: 'goodbye' });

    let result = await Post.query({ title: 'hello' });
    t.is(result.length, 3, 'returns the correct number of records');
    t.is(result[0].id, 1);
    t.is(result[0].title, 'hello');
    t.is(result[1].title, 'hello');
    t.is(result[2].title, 'hello');
  });

  test('#query() returns an empty array if no records match', async (t) => {
    let { lookup } = t.context;
    let Post = lookup('model:post');

    let result = await Post.query({ foo: 'bar' });
    t.is(result.length, 0);
  });

  // -----------------
  // #all()
  // -----------------

  test('#all() returns all records for the given type', async (t) => {
    let { lookup } = t.context;
    let Post = lookup('model:post');
    await Post.create({ title: 'one' });
    await Post.create({ title: 'two' });

    let allRecords = await Post.all('post');
    t.is(allRecords.length, 2);
    t.is(allRecords[0].title, 'one');
    t.is(allRecords[1].title, 'two');
  });

  test('#all() returns an empty array if no records exist for that type', async (t) => {
    let { lookup } = t.context;
    let Post = lookup('model:post');

    let result = await Post.all({ foo: 'bar' });
    t.is(result.length, 0);
  });

}