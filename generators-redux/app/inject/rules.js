/*
 * @description
 * each rule has own name and consists of array with instructions
 * each instruction has 2 fields: cursor and replacement
 * cursor - is a mark for regular expression search - it what should injector search in existing files
 * replacement is a result which will be inserted to existing files before cursor.
 * Replacement has access to lodash + mixins + props
 * //†action
 * */
/* eslint-disable */
module.exports = {
  'action': [
    {
      cursor: '//†type',
      replacement: `'<%=_.toConstantFormatRaw(name)%>',`
    },
  ],
  'route-to-app-route': [
    {
      cursor: '//†import',
      replacement: `import <%=_.camelCase(name)%>Route from '../home/<%=name%>';`
    },
    {
      cursor: '//†route',
      replacement: `<%=_.camelCase(name)%>Route(store),`
    },
  ],
  'reducer': [
    {
      cursor: '//†handler',
      replacement: `[TYPE.<%=_.toConstantFormat(name)%>]: <%=_.camelCase(name)%>,`
    },
    {
      cursor: '//†reducer',
      replacement: `function <%=_.camelCase(name)%>(state, { payload }) {
    return state;
}`
    }
  ],
};
