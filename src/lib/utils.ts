import { odooApi } from "./odoo";

export const moduleInstalled = async (mod: string): Promise<boolean> => {
  const odoo = odooApi();
  const result = await odoo.search('ir.module.module', {
    fields: "{id}",
    filter: `[["name","=","${mod}"]]`
  });
  return new Promise(resolve => {
    if (result.length) {
      resolve(true)
    } else {
      resolve(false)
    }
  });
}