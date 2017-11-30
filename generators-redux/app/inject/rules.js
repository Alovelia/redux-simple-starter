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
  'intl-to-main-intl': [
    {
      cursor: '"_": " ",',
      replacement: `"<%=name%>.title": "<%=_.humanize(name)%>",`
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
  'reducer-to-root-reducer': [
    {
      cursor: '//†import',
      replacement: `import <%=_.camelCase(name)%> from 'src/<%=name%>/reducer';`
    },
    {
      cursor: '//†reducer',
      replacement: `<%=_.camelCase(name)%>,`
    },
  ],
  'route-to-app-route': [
    {
      cursor: '//†import',
      replacement: `import <%=_.camelCase(name)%>Route from '../<%=name%>';`
    },
    {
      cursor: '//†route',
      replacement: `<%=_.camelCase(name)%>Route(store),`
    },
  ],
  'route-to-app-route-config': [
    {
      cursor: '//†route',
      replacement: `'<%=name%>': {
    path: '/<%=name%>',
    name: '<%=_.camelCase(name)%>',
    title: '<%=name%>.title',
    // permissionId: '<%=_.toConstantFormat(name)%>',
  },`
    },
  ],
  'saga-to-root-saga': [
    {
      cursor: '//†import',
      replacement: `import <%=_.camelCase(name)%>Sagas from '../<%=name%>/sagas';`
    },
    {
      cursor: '//†saga',
      replacement: `...<%=_.camelCase(name)%>Sagas,`
    },
  ],
};
