import { RegisterContextual } from 'ava';

export default function querying(test: RegisterContextual<any>) {

  // -----------------
  // #idFor()
  // -----------------

  test('#idFor() returns the id for the record', async (t) => {
    let { db } = t.context;
    let { id } = await db.create('post', { title: 'one' }).save();

    let post = await db.find('post', id);
    
    t.is(post.id, id);
  });

  // -----------------
  // #getAttribute()
  // -----------------

  test('#getAttribute() returns the value of the given attriute', async (t) => {
    let { db } = t.context;
    let { id } = await db.create('post', { title: 'one' }).save();

    let post = await db.find('post', id);
    
    t.is(post.title, 'one');
  });

  // -----------------
  // #setAttribute()
  // -----------------

  test('#setAttribute() sets the value of the given attriute', async (t) => {
    let { db } = t.context;
    let { id } = await db.create('post', { title: 'one' }).save();

    let post = await db.find('post', id);
    post.title = 'two';
    
    t.is(post.title, 'two');
  });

}
