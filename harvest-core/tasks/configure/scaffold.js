/*
 * Task: scaffold
 * Creates the directories and moves our boilerplate template over to source dir
 */

// Core libraries
import fs from 'fs.extra'; // will include native FS and extras
import async from 'async';
import coreConfig from '../../config/config';

/*
 * isDir - checks to see if a given path is a directory or not
 * @params {string} path - path to check
 * @params {function} cb - callback to run when done
 */
const isDir = (path, cb) => {
  fs.stat(path, (err, stats) => {
    if(err) return cb(err, null);
    return cb(err, stats.isDirectory());
  })
};

/*
 * mkdir - creates a directory
 * @params {string} path - path to make
 * @params {function} cb - callback to run when done
 */
const mkdir = (path, cb) => {
  fs.mkdir(path, (err) => cb(err));
};

/*
 * readOrMakeDir - checks to see if a directory exists before trying to make it
 * @params {string} path - path to check and/or make
 * @params {function} cb - callback to run when done
 */
const readOrMakeDir = (path, cb) => {
  isDir(path, (err, results) => {
    if(err && err.code === 'ENOENT' && !results) return mkdir(path, (err) => cb(err));
    console.log(`Could not create ${path}, make sure that this doesn't exist`);
    cb(null);
  });
};

/*
 * copyTemplate - moves the template boilerplate to the source directory
 * @params {string} dest - where to copy to
 * @params {function} cb - callback to run when done
 */
const copyTemplate = (dest, cb) => {
  fs.copyRecursive(coreConfig.files.template, dest, (err) => cb(err));
};

/*
 * default
 * Public method that updates the NPM package and runs CLI tasks
 * @params: config (object) - config from the CLI prompts
 * @params: cb     (function) - callback for async
 */
export default function(config, cb) {
  async.parallel([
    (cb) => {
      copyTemplate(config.src, (err) => cb(err));
    },
    (cb) => {
      readOrMakeDir(config.dist, (err) => cb(err));
    }
  ], (err, results) => {
    console.log('Finished with the directories');
    return cb(err, results);
  });

};