import { OdooObject } from './interfaces';
import restClient from './rest-api';
/* To-Do:
- Escribir metodos bulk
- Pasar todo a Record y Field
- escribir model method y object method
*/
class QueryService {
  query_filter(data: OdooObject): Promise<any> {
    let request_query = `/api/${data.model}`;
    if (data.fields) {
      request_query + data.fields;
    }
    return restClient.get(request_query, {
      params: {
        query: data.fields,
        filter: data.filter,
        limit: data.limit,
      },
    });
  }

  // pasar a record
  query(data: any): Promise<any> {
    const request_query = `/api/${data.model}/${data.id}`;
    return restClient.get(request_query);
  }

  // pasar a record
  write(data: any): Promise<any> {
    console.log('en odoo rest');
    console.log(data)
    const request_query = `/api/${data.model}/`;
    return restClient.put(request_query, {
      params: {
        filter: [['id', '=', data.id]],
        data: data.values,
      },
    });
  }

  // funciona ok
  delete(data: any): Promise<any> {
    const request_query = `/api/${data.model}/${data.id}`;
    return restClient.delete(request_query);
  }

  // funciona ok
  create(data: any): Promise<any> {
    console.log(data)
    const request_query = `/api/${data.model}/`;
    return restClient.post(request_query, { params: { data: data.values } });
  }

  //terminar
  call_function(data: any, method: string, type: string): Promise<any> {
    let request_query = String('');
    switch (type) {
      case 'record':
        request_query = `/object/${data.model}/${data.id}/${method}`;
        break;
      case 'model':
        request_query = `/object/${data.model}/${method}`;
        break;
    }
    let json_params = {
      params: {
        args: [],
        kwargs: data.kwargs,
      },
    };
    return restClient.post(request_query, JSON.stringify(json_params));
  }
}

export default new QueryService();
