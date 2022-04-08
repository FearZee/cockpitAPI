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
  return db.createTable('task', {
    id: {type: "int", primaryKey: true, autoIncrement: true},
    name: 'string',
    desc: 'string',
    duration: 'string',
    priority: 'int',
    progress: 'int',
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
    },
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
    topic_id: {
      type: 'int',
      foreignKey: {
        name: 'topic_id_fk',
        table: 'topic',
        mapping: 'id',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        }
      }
    },
    is_completed: 'bool',
    author_id: {
      type: 'int',
      foreignKey: {
        name: 'user_author_id_fk',
        table: 'users',
        mapping: 'id',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        }
      }
    },
    task_column_id: {
      type: 'int',
      foreignKey: {
        name: 'task_column_id_fk',
        table: 'task_columns',
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
