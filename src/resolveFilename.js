import fsp from 'fs-promise';
import path from 'path';

/**
 * Resolves module paths.
 *
 * If a .server filename is found, it will try to load instead:
 * 1. a .client filename if present
 * 2. just the filename without postfix.
 *
 * logger.js -> logger.js (shared)
 * logger.server.js -> logger.client.js
 *
 * @param {String} filename
 * @param {String} target
 * @return {Promise.<String>}
 */
export default function resolveFilename(filename, subextension) {
  const dirname = path.dirname(filename);
  const extension = path.extname(filename);
  const basename = path.basename(filename, extension);
  const splitFilename = path.join(dirname, basename + subextension + extension);

  return fsp.exists(splitFilename)
    .then(exists => {
      return exists ? splitFilename : filename;
    });
}
