import {
  getTenantsList,
  getTenantById,
} from './functions/get-tenants';

import { newTenant } from './functions/save-tenants';

exports.getAll = (event, context, callback) => getTenantsList(event, context, callback);

exports.getSingle = (event, context, callback) => getTenantById(event, context, callback);

exports.create = (event, context, callback) => newTenant(event, context, callback);
