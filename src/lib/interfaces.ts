export interface OdooObject {
  model: String,
  id?: Number,
  ids?: Number[],
  dirty?: Boolean,
  values?: object,
  fields?: string,
  filter?: string,
  limit?: Number
}