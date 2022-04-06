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
  return db.createTable('topic', {
    id: {type: 'int', primaryKey: true, autoIncrement: true},
    name: 'string',
    date_of_creation: 'string',
    project_id: {
      type: 'int',
      foreignKey: {
        name: 'project_id_fk',
        table: 'project',
        mapping: 'id',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        }
      }
    },
  });
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
