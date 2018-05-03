import { getTenantsList } from './functions/get-tenants';

exports.get = (event, context, callback) => getTenantsList(event, context, callback);
