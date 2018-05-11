// @flow

import React, { PureComponent, type Node } from 'react';
// Material ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import { createMuiTheme } from 'material-ui/styles';
// import blue from 'material-ui/colors/blue';
import grey from 'material-ui/colors/grey';

import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import {
  // $FlowExpectedError
  createGenerateClassName,
  jssPreset,
  createMuiTheme,
} from 'material-ui/styles';

// styled components
import { ThemeProvider } from 'styled-components';

const generateClassName = createGenerateClassName();
const jss = create(jssPreset());

if (process.env.NODE_ENV !== 'test') {
  // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
  jss.options.insertionPoint = 'jss-insertion-point';
}

/*
* https://material-ui-next.com/customization/default-theme/
* theme could be used inside components using withTheme
* how to update styles with styled components
* https://github.com/styled-components/styled-components/issues/1253#issuecomment-337871693
* to style components with styled-components it's required to add weight for selector
* @example
* const StyledTypography = styled(Typography)`
*  && {
*    color: palevioletred;
*    font-weight: bold;
*  }
*`;
* ssr https://material-ui-next.com/guides/server-rendering/
* ssr styled components https://www.styled-components.com/docs/advanced#server-side-rendering
* theme provider https://www.styled-components.com/docs/advanced#theming
* material ui + styled components https://material-ui-next.com/guides/interoperability/#styled-components
* https://codesandbox.io/s/mzwqkk1p7j
* babel plugin for styled components https://www.styled-components.com/docs/tooling#babel-plugin
*
*  https://github.com/mui-org/material-ui/issues/10558#issuecomment-372256396
* "babel-plugin-styled-components": "^1.5.1",
* and adding the following code to babel file
*
* {
*    "presets": [
*        "next/babel"
*      ],
*    "plugins": [
*        ["styled-components", { "ssr": true, "displayName": true, "preprocess": false } ]
*    ]
*}
*
* how to use material ui themes https://material-ui-next.com/customization/themes/ + react-jss
* */

export const theme = createMuiTheme({
  palette: {
    // primary: blue,
    primary: grey,
  },
});
//
// export const Material = ({ children }) => (<MuiThemeProvider theme={theme}>
//     {children}
// </MuiThemeProvider>);

type TProps = {
  children: Node,
};

export class Styles extends PureComponent<TProps> {
  // Remove the server-side injected CSS.
  componentDidMount() {
    // https://material-ui-next.com/guides/server-rendering/
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { children } = this.props;

    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </MuiThemeProvider>
      </JssProvider>
    );
  }
}
