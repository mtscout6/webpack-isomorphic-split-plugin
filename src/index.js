import fsp from 'fs-promise';
import resolveFilename from './resolveFilename';
import _ from 'lodash';

export default class IsomorphicSplitPlugin {
  constructor(subextension) {
    this.subextension = subextension;
  }

  apply(compiler) {
    const subextension = this.subextension;

    compiler.plugin('normal-module-factory', function (nmf) {
      nmf.plugin('after-resolve', function (result, callback) {
        const oldResource = result.resource;

        resolveFilename(result.resource, subextension)
          .then(newResource => {
            result.request = result.request.slice(0, -1 * oldResource.length) + newResource;
            result.userRequest = result.userRequest.slice(0, -1 * oldResource.length) + newResource;
            result.resource = newResource;

            callback(null, result);
          })
          .catch(err => {
            callback(err, null);
          });
      });
    });
  }
}
