import {Metadata} from './metadata';

export abstract class Advice {
  constructor(public context: Object, public advice: Function) {}
  abstract wove(target: Function, metadata: Metadata);
  invoke(target: any, metadata: Metadata) {
    if (target.__woven__) {
      metadata.method.result = target.apply(this.context, metadata.method.args);
    } else {
      if (metadata.method.proceed) {
        target.bind(metadata.method.context, metadata).apply(null, metadata.method.args);
      } else {
        return metadata.method.result;
      }
    }
  }
}
