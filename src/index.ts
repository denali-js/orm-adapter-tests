import { values } from 'lodash';

// Test suites
import querying from './querying';
import creating from './creating';
import records from './records';
import relationships from './relationships';

export interface Options {
  setup?(test: any): void;
  mocks?(context: any): Promise<void>
}

export default async function testAdapter(test: any, Adapter: any) {
  test.beforeEach(async (t: any) => {
    let { container, inject } = t.context;
    let models: { [modelName: string]: any } = container.lookupAll('model');
    inject('orm-adapter:application', Adapter);
    let adapter = container.lookup('orm-adapter:application');
    await adapter.defineModels(values(models));
  });

  querying(test);
  creating(test);
  records(test);
  relationships(test);
}
