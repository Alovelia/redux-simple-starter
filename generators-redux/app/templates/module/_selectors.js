import { createSelector } from 'reselect';

export const select<%=_.camelCaseUpperFirst(name)%> = state => state.get('<%=name%>');

// export const makeSelect_ = () => createSelector(
//   select<%=_.camelCaseUpperFirst(name)%>,
//   <%=_.camelCase(name)%>State => <%=_.camelCase(name)%>State && <%=_.camelCase(name)%>State.get('username')
// );
