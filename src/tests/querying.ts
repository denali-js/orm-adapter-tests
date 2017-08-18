import { RegisterContextual } from 'ava';

export default function querying(test: RegisterContextual<any>) {

  // -----------------
  // #find()
  // -----------------

  test('#find() returns the requested record', async (t) => {
    let { db } = t.context;
    let post = await db.create('post', { title: 'one' }).save();
    
    let result = await db.find('post', post.id);
    t.truthy(result);
    t.is(result.id, 1);
    t.is(result.title, 'one');
  });

  test('#find() returns null if not found', async (t) => {
    let { db } = t.context;
    
    let result = await db.find('post', 'non-existent-id');
    t.is(result, null);
  });

  // -----------------
  // #queryOne()
  // -----------------

  test('#queryOne() returns the matching record with basic filter syntax', async (t) => {
    let { db } = t.context;
    await db.create('post', { title: 'one' }).save();
    
    let result = await db.queryOne('post', { title: 'one' });
    t.truthy(result);
    t.is(result.id, 1);
    t.is(result.title, 'one');
  });

  test('#queryOne() returns null if not found', async (t) => {
    let { db } = t.context;
    
    let result = await db.queryOne('post', { foo: 'bar' });
    t.is(result, null);
  });

  // -----------------
  // #query()
  // -----------------

  test('#query() returns the matching records with basic filter syntax', async (t) => {
    let { db } = t.context;
    await db.create('post', { title: 'hello' }).save();
    await db.create('post', { title: 'hello' }).save();
    await db.create('post', { title: 'hello' }).save();
    await db.create('post', { title: 'goodbye' }).save();
    
    let result = await db.query('post', { title: 'hello' });
    t.is(result.length, 3, 'returns the correct number of records');
    t.is(result[0].id, 1);
    t.is(result[0].title, 'hello');
    t.is(result[1].title, 'hello');
    t.is(result[2].title, 'hello');
  });

  test('#query() returns an empty array if no records match', async (t) => {
    let { db } = t.context;
    
    let result = await db.query('post', { foo: 'bar' });
    t.is(result.length, 0);
  });

  // -----------------
  // #all()
  // -----------------

  test('#all() returns all records for the given type', async (t) => {
    let { db } = t.context;
    await db.create('post', { title: 'one' }).save();
    await db.create('post', { title: 'two' }).save();
    
    let allRecords = await db.all('post');
    t.is(allRecords.length, 2);
    t.is(allRecords[0].title, 'one');
    t.is(allRecords[1].title, 'two');
  });

  test('#all() returns an empty array if no records exist for that type', async (t) => {
    let { db } = t.context;
    
    let result = await db.all('post', { foo: 'bar' });
    t.is(result.length, 0);
  });

}