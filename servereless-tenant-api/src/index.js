import {
  getTenantsList,
  getTenantById,
} from './functions/get-tenants';

exports.getAll = (event, context, callback) => getTenantsList(event, context, callback);

exports.getSingle = (event, context, callback) => getTenantById(event, context, callback);
