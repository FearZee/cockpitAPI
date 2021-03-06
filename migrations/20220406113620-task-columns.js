'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('task_columns', {
    id: {type: 'int', primaryKey: true, autoIncrement: true},
    name: 'string',
    user_id: {
        type: 'int',
        foreignKey: {
          name: 'user_id_fk',
          table: 'users',
          mapping: 'id',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
          }
        }
      }
  });
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
