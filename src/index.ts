import { values } from 'lodash';
import { RegisterContextual, TestContext, Context } from 'ava';
import { Model, Container, DatabaseService, ORMAdapter } from 'denali';

// Test models
import Post from './models/post';
import Comment from './models/comment';

// Test suites
import querying from './tests/querying';
import creating from './tests/creating';
import records from './tests/records';
import relationships from './tests/relationships';

export interface mocks {
  (t: TestContext & Context<any>, container: Container): void;
  (t: TestContext & Context<any>, container: Container): Promise<void>;
}

const Models: { [type: string]: typeof Model } = {
  post: Post,
  comment: Comment
};

export default async function testAdapter(test: RegisterContextual<any>, AdapterClass: typeof ORMAdapter, mocks?: mocks) {

  test.beforeEach(async (t) => {
    let container = t.context.container = new Container(process.cwd());
    for (let type in Models) {
      container.register(`model:${ type }`, Models[type]);
    }
    container.register('service:database', DatabaseService);
    container.register('orm-adapter:application', AdapterClass);
    if (typeof mocks === 'function') {
      await mocks(t, container);
    }
    t.context.db = container.lookup('service:database');
    let adapter = t.context.instance = container.lookup('orm-adapter:application');
    let models: { [modelName: string]: typeof Model } = container.lookupAll('model');
    await adapter.defineModels(values(models));
  });

  querying(test);
  creating(test);
  records(test);
  relationships(test);

}
