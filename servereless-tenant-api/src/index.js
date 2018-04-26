import { success } from '../../_shared/labda/responses';

exports.get = (event, context, callback) => {
  callback(null, success({ data: 'Success2' }));
};