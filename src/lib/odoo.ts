import { OdooObject } from './interfaces';
// import { OdooObject } from './odoo';
import LoginService from "./login-service"
import QueryService from "./query-service";

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
    const results = await QueryService.query(oQuery);
    return results.data;
  }

  async function write(model: string, data: any) {
    console.log('en odoo ts')
    console.log(data)
    const oQuery: OdooObject = {
      model: model,
      values: data,
      id: data.id,
    }
    const results = await QueryService.write(oQuery);
    return results.data;
  }


  async function create(model: string, data: any) {
    const oQuery: OdooObject = {
      model: model,
      values: data.data
    }
    console.log(oQuery)
    const results = await QueryService.create(oQuery);
    return results.data;
  }

  async function unlink(model: string, data: any) {
    const oQuery: OdooObject = {
      model: model,
      id: data.id
    }
    const results = await QueryService.delete(oQuery);
    return results.data;
  }

  async function exec(record: any, method: string) {
    const results = await QueryService.call_function(record, method, 'x')
    return results
  }

  async function search(model: string, data?: any) {
    const oQuery: OdooObject = {
      model: model,
      filter: data.filter,
      limit: data.limit,
      fields: data.fields
    }
    const results = await QueryService.query_filter(oQuery);
    return new Promise(resolve => {
      resolve(results.data.result)
    })
  }
  return {
    write,
    read,
    search,
    login,
    exec,
    create,
    unlink,
    delete: unlink
  }
}