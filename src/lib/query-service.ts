import { OdooObject } from './interfaces';
import restClient from './rest-api';
/* To-Do:
- Escribir metodos bulk
- Pasar todo a Record y Field
- escribir model method y object method
*/

function o_write(data: any): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    const request_query = `/api/${data.model}/${data.id}`;
    restClient.put(request_query, {
      params: {
        data: data.values,
      },
    }).then((response) => {
      if (response.data && response.data.result == true) {
        resolve(response);
      } else {
        // throw new Error("Error processing request");
        reject('request_failed');
      }
    });
  })
}
// funciona ok
function o_create(data: any): Promise<any> {
  console.log(data)
  return new Promise<any>((resolve, reject) => {
    const request_query = `/api/${data.model}/`;
    restClient.post(request_query, { params: { data: data.values } }).then((response) => {
      if (response.data && response.data.result == true) {
        resolve(response)
      } else {
        reject(response);
      }
    });
  });
}

// funciona ok
function o_delete(data: any): Promise<any> {
  const request_query = `/api/${data.model}/${data.id}`;
  return new Promise<any>((resolve, reject) => {

    restClient.delete(request_query).then((response) => {
      if (response.data && response.data.result == true) {
        resolve(response);
      }
      else {
        reject(response);
      }
    });
  })
}

function o_query_filter(data: OdooObject): Promise<any> {
  let request_query = `/api/${data.model}`;
  if (data.fields) {
    request_query + data.fields;
  }
  return new Promise<any>((resolve, reject) => {

    restClient.get(request_query, {
      params: {
        query: data.fields,
        filter: data.filter,
        limit: data.limit,
      },
    }).then((response) => {
      if (response.status && response.status == 200) {
        resolve(response)
      }
      else {
        reject(response)
      }
    })
  })
}


// pasar a record
function o_query(data: any): Promise<any> {
  const request_query = `/api/${data.model}/${data.id}`;
  return new Promise<any>((resolve, reject) => {
    restClient.get(request_query).then((response) => {
      if (response.status && response.status == 200) {
        resolve(response)
      } else {
        reject(response)
      }
    })
  })
}


function o_call_function(data: any, method: string, type: string): Promise<any> {
  let request_query = String('');
  switch (type) {
    case 'record':
      request_query = `/object/${data.model}/${data.id}/${method}`;
      break;
    case 'model':
      request_query = `/object/${data.model}/${method}`;
      break;
  }
  const json_params = {
    params: {
      args: [],
      kwargs: data.kwargs,
    },
  };
  return new Promise((resolve, reject) => {

    restClient.post(request_query, JSON.stringify(json_params)).then((response) => {
      if (response.data && response.data.result == true) {
        resolve(response);
      } else {
        reject('function_execuction_error');
      };
    })
  });
}

export {
  o_write,
  o_delete,
  o_create,
  o_query,
  o_query_filter,
  o_call_function

}
/* export default new QueryService();*/
