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
  return db.createTable('user_role', {
    id: {type: 'int', primaryKey: true, autoIncrement: true},
    role_id: {
      type: 'int',
      foreignKey: {
        name: 'role_id_fk',
        table: 'role',
        mapping: 'id',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        }
      }
    },
    user_id: {
      type: 'int',
      foreignKey: {
        name: 'user_id_fk',
        table: 'user',
        mapping: 'id',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        }
      }
    },
    date_of_creation: 'string'
  });
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
