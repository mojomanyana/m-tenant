import {
  getTenantsList,
  getTenantByName,
} from './functions/get-tenants';

import {
  newTenant,
  newTaskForTenant,
} from './functions/save-tenants';

exports.getAll = (event, context, callback) => getTenantsList(event, context, callback);

exports.getSingle = (event, context, callback) => getTenantByName(event, context, callback);

exports.create = (event, context, callback) => newTenant(event, context, callback);

exports.addTask = (event, context, callback) => newTaskForTenant(event, context, callback);
