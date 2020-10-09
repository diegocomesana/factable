import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
// import { Normalize } from "styled-normalize";

const Style = createGlobalStyle`
  
  html {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: Proxima Nova;
    background-color: white;
    margin: 0;
    padding: 0;
    /* width: 100%;
    height: 100%; */
  }
  
  * {
    box-sizing: border-box;
    
  }

  h2, h2, h3, h4, p, a {
    margin: 0;
    padding: 0;
  }

  #root {
    margin: 0;
    padding: 0;
    /* width: 100%;
    height: 100%; */
  }

  @font-face {
    font-family:'Proxima Nova';
    font-weight:300;
    font-display:swap;
    font-style:normal;
    src: url(https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-light.woff2) format("woff2"), url(https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-light.woff) format("woff"), url(https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-light.ttf) format("truetype")
  }

  @font-face {
    font-family:'Proxima Nova';
    font-weight:400;
    font-display:swap;
    font-style:normal;
    src: url(https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-regular.woff2) format("woff2"), url(https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-regular.woff) format("woff"), url(https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-regular.ttf) format("truetype")
  }

  @font-face {
    font-family:'Proxima Nova';
    font-weight:600;
    font-display:swap;
    font-style:normal;
    src: url(https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-semibold.woff2) format("woff2"), url(https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-semibold.woff) format("woff"), url(https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-semibold.ttf) format("truetype")
  }


`;

export const GlobalStyle = ({ children, theme = {} }) => (
  <ThemeProvider {...{ theme }}>
    <React.Fragment>
      {/* <Normalize /> */}
      <Style />
      {children}
    </React.Fragment>
  </ThemeProvider>
);

export default GlobalStyle;
