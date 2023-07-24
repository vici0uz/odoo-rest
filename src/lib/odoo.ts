import { OdooObject } from './interfaces';
// import { OdooObject } from './odoo';
import LoginService from "./login-service"
import { o_call_function, o_create, o_delete, o_query, o_query_filter, o_write } from "./query-service";

export const odooApi = (): any => {

  async function login(data: any) {
    const results = await LoginService.login(data);
    return results
  }

  async function read(model: string, data: any) {
    const oQuery: OdooObject = {
      model: model,
      id: data.id
    }
    const results = await o_query(oQuery);
    return results.data;
  }

  async function write(model: string, recordId: number, data: any) {
    const oQuery: OdooObject = {
      model: model,
      values: data,
      id: recordId,
    }
    // const results = await o_write(oQuery);
    // return results.data;
    return new Promise((resolve, reject) => {
      o_write(oQuery).then((results) => {
        if (results.data.result == true) {
          resolve(results.data);
        }
        else {
          reject(results)
        }
      })
    })
  }


  async function create(model: string, data: any) {
    const oQuery: OdooObject = {
      model: model,
      values: data.data
    }
    const results = await o_create(oQuery);
    return results.data;
  }

  async function unlink(model: string, data: any) {
    const oQuery: OdooObject = {
      model: model,
      id: data.id
    }
    const results = await o_delete(oQuery);
    return results.data;
  }

  async function exec_record(model: any, recordId: number, method: string, args: any) {
    const oQuery: OdooObject = {
      model: model,
      id: recordId,
      method: method,
      kwargs: args
    }
    const results = await o_call_function(oQuery, 'record')
    return results
  }

  async function exec_model(model: any, method: string, args: any) {
    const oQuery: OdooObject = {
      model: model,
      method: method,
      kwargs: args
    }
    const results = await o_call_function(oQuery, 'model')
    return results
  }

  async function search(model: string, data?: any) {
    const oQuery: OdooObject = {
      model: model,
      filter: data.filter,
      limit: data.limit,
      fields: data.fields,
      order: data.order,
    }
    const results = await o_query_filter(oQuery);
    return new Promise(resolve => {
      resolve(results.data.result)
    })
  }
  return {
    write,
    read,
    search,
    login,
    exec_record,
    exec_model,
    create,
    unlink,
    delete: unlink
  }
}