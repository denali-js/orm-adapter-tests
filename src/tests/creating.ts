import { RegisterContextual } from 'ava';

export default function querying(test: RegisterContextual<any>) {

  // -----------------
  // #create()
  // -----------------

  test('#createRecord() saves a record', async (t) => {
    let { db } = t.context;
    let post = await db.create('post', { title: 'one' }).save();
    
    let result = await db.find('post', post.id);
    t.truthy(result);
    t.is(result.id, 1);
    t.is(result.title, 'one');
  });

}