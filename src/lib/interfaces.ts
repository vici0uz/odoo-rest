export interface OdooObject {
  model: String,
  id?: Number,
  ids?: Number[],
  dirty?: Boolean,
  values?: object,
  fields?: String,
  filter?: String,
  limit?: Number,
  order?: String,
  method?: String,
  args?: Object,
  kwargs?: Object
}