import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
// import { Normalize } from "styled-normalize";

const Style = createGlobalStyle`
  
  html {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: Roboto;
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
    font-family: 'Righteous';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('Righteous'), local('Righteous-Regular'), url(https://fonts.gstatic.com/s/righteous/v9/1cXxaUPXBpj2rGoU7C9WhnGFq8Kk1doH.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'Righteous';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('Righteous'), local('Righteous-Regular'), url(https://fonts.gstatic.com/s/righteous/v9/1cXxaUPXBpj2rGoU7C9WiHGFq8Kk1Q.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

/* cyrillic-ext */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 100;
  font-display: swap;
  src: local('Roboto Thin Italic'), local('Roboto-ThinItalic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOiCnqEu92Fr1Mu51QrEz0dL-vwnYh2eg.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 100;
  font-display: swap;
  src: local('Roboto Thin Italic'), local('Roboto-ThinItalic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOiCnqEu92Fr1Mu51QrEzQdL-vwnYh2eg.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 100;
  font-display: swap;
  src: local('Roboto Thin Italic'), local('Roboto-ThinItalic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOiCnqEu92Fr1Mu51QrEzwdL-vwnYh2eg.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 100;
  font-display: swap;
  src: local('Roboto Thin Italic'), local('Roboto-ThinItalic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOiCnqEu92Fr1Mu51QrEzMdL-vwnYh2eg.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 100;
  font-display: swap;
  src: local('Roboto Thin Italic'), local('Roboto-ThinItalic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOiCnqEu92Fr1Mu51QrEz8dL-vwnYh2eg.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 100;
  font-display: swap;
  src: local('Roboto Thin Italic'), local('Roboto-ThinItalic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOiCnqEu92Fr1Mu51QrEz4dL-vwnYh2eg.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 100;
  font-display: swap;
  src: local('Roboto Thin Italic'), local('Roboto-ThinItalic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOiCnqEu92Fr1Mu51QrEzAdL-vwnYg.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 300;
  font-display: swap;
  src: local('Roboto Light Italic'), local('Roboto-LightItalic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TjASc3CsTYl4BOQ3o.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 300;
  font-display: swap;
  src: local('Roboto Light Italic'), local('Roboto-LightItalic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TjASc-CsTYl4BOQ3o.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 300;
  font-display: swap;
  src: local('Roboto Light Italic'), local('Roboto-LightItalic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TjASc2CsTYl4BOQ3o.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 300;
  font-display: swap;
  src: local('Roboto Light Italic'), local('Roboto-LightItalic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TjASc5CsTYl4BOQ3o.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 300;
  font-display: swap;
  src: local('Roboto Light Italic'), local('Roboto-LightItalic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TjASc1CsTYl4BOQ3o.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 300;
  font-display: swap;
  src: local('Roboto Light Italic'), local('Roboto-LightItalic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TjASc0CsTYl4BOQ3o.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 300;
  font-display: swap;
  src: local('Roboto Light Italic'), local('Roboto-LightItalic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TjASc6CsTYl4BO.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: local('Roboto Italic'), local('Roboto-Italic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1Mu51xFIzIXKMnyrYk.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: local('Roboto Italic'), local('Roboto-Italic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1Mu51xMIzIXKMnyrYk.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: local('Roboto Italic'), local('Roboto-Italic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1Mu51xEIzIXKMnyrYk.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: local('Roboto Italic'), local('Roboto-Italic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1Mu51xLIzIXKMnyrYk.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: local('Roboto Italic'), local('Roboto-Italic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1Mu51xHIzIXKMnyrYk.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: local('Roboto Italic'), local('Roboto-Italic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1Mu51xGIzIXKMnyrYk.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: local('Roboto Italic'), local('Roboto-Italic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1Mu51xIIzIXKMny.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 500;
  font-display: swap;
  src: local('Roboto Medium Italic'), local('Roboto-MediumItalic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51S7ACc3CsTYl4BOQ3o.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 500;
  font-display: swap;
  src: local('Roboto Medium Italic'), local('Roboto-MediumItalic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51S7ACc-CsTYl4BOQ3o.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 500;
  font-display: swap;
  src: local('Roboto Medium Italic'), local('Roboto-MediumItalic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51S7ACc2CsTYl4BOQ3o.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 500;
  font-display: swap;
  src: local('Roboto Medium Italic'), local('Roboto-MediumItalic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51S7ACc5CsTYl4BOQ3o.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 500;
  font-display: swap;
  src: local('Roboto Medium Italic'), local('Roboto-MediumItalic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51S7ACc1CsTYl4BOQ3o.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 500;
  font-display: swap;
  src: local('Roboto Medium Italic'), local('Roboto-MediumItalic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51S7ACc0CsTYl4BOQ3o.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 500;
  font-display: swap;
  src: local('Roboto Medium Italic'), local('Roboto-MediumItalic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51S7ACc6CsTYl4BO.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 700;
  font-display: swap;
  src: local('Roboto Bold Italic'), local('Roboto-BoldItalic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TzBic3CsTYl4BOQ3o.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 700;
  font-display: swap;
  src: local('Roboto Bold Italic'), local('Roboto-BoldItalic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TzBic-CsTYl4BOQ3o.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 700;
  font-display: swap;
  src: local('Roboto Bold Italic'), local('Roboto-BoldItalic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TzBic2CsTYl4BOQ3o.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 700;
  font-display: swap;
  src: local('Roboto Bold Italic'), local('Roboto-BoldItalic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TzBic5CsTYl4BOQ3o.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 700;
  font-display: swap;
  src: local('Roboto Bold Italic'), local('Roboto-BoldItalic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TzBic1CsTYl4BOQ3o.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 700;
  font-display: swap;
  src: local('Roboto Bold Italic'), local('Roboto-BoldItalic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TzBic0CsTYl4BOQ3o.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 700;
  font-display: swap;
  src: local('Roboto Bold Italic'), local('Roboto-BoldItalic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TzBic6CsTYl4BO.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 900;
  font-display: swap;
  src: local('Roboto Black Italic'), local('Roboto-BlackItalic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TLBCc3CsTYl4BOQ3o.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 900;
  font-display: swap;
  src: local('Roboto Black Italic'), local('Roboto-BlackItalic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TLBCc-CsTYl4BOQ3o.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 900;
  font-display: swap;
  src: local('Roboto Black Italic'), local('Roboto-BlackItalic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TLBCc2CsTYl4BOQ3o.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 900;
  font-display: swap;
  src: local('Roboto Black Italic'), local('Roboto-BlackItalic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TLBCc5CsTYl4BOQ3o.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 900;
  font-display: swap;
  src: local('Roboto Black Italic'), local('Roboto-BlackItalic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TLBCc1CsTYl4BOQ3o.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 900;
  font-display: swap;
  src: local('Roboto Black Italic'), local('Roboto-BlackItalic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TLBCc0CsTYl4BOQ3o.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 900;
  font-display: swap;
  src: local('Roboto Black Italic'), local('Roboto-BlackItalic'), url(https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TLBCc6CsTYl4BO.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 100;
  font-display: swap;
  src: local('Roboto Thin'), local('Roboto-Thin'), url(https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1MmgVxFIzIXKMnyrYk.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 100;
  font-display: swap;
  src: local('Roboto Thin'), local('Roboto-Thin'), url(https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1MmgVxMIzIXKMnyrYk.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 100;
  font-display: swap;
  src: local('Roboto Thin'), local('Roboto-Thin'), url(https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1MmgVxEIzIXKMnyrYk.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 100;
  font-display: swap;
  src: local('Roboto Thin'), local('Roboto-Thin'), url(https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1MmgVxLIzIXKMnyrYk.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 100;
  font-display: swap;
  src: local('Roboto Thin'), local('Roboto-Thin'), url(https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1MmgVxHIzIXKMnyrYk.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 100;
  font-display: swap;
  src: local('Roboto Thin'), local('Roboto-Thin'), url(https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1MmgVxGIzIXKMnyrYk.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 100;
  font-display: swap;
  src: local('Roboto Thin'), local('Roboto-Thin'), url(https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1MmgVxIIzIXKMny.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: local('Roboto Light'), local('Roboto-Light'), url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmSU5fCRc4AMP6lbBP.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: local('Roboto Light'), local('Roboto-Light'), url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmSU5fABc4AMP6lbBP.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: local('Roboto Light'), local('Roboto-Light'), url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmSU5fCBc4AMP6lbBP.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: local('Roboto Light'), local('Roboto-Light'), url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmSU5fBxc4AMP6lbBP.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: local('Roboto Light'), local('Roboto-Light'), url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmSU5fCxc4AMP6lbBP.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: local('Roboto Light'), local('Roboto-Light'), url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmSU5fChc4AMP6lbBP.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: local('Roboto Light'), local('Roboto-Light'), url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmSU5fBBc4AMP6lQ.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu72xKKTU1Kvnz.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu5mxKKTU1Kvnz.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu7mxKKTU1Kvnz.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4WxKKTU1Kvnz.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu7WxKKTU1Kvnz.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu7GxKKTU1Kvnz.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: local('Roboto Medium'), local('Roboto-Medium'), url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmEU9fCRc4AMP6lbBP.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: local('Roboto Medium'), local('Roboto-Medium'), url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmEU9fABc4AMP6lbBP.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: local('Roboto Medium'), local('Roboto-Medium'), url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmEU9fCBc4AMP6lbBP.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: local('Roboto Medium'), local('Roboto-Medium'), url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmEU9fBxc4AMP6lbBP.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: local('Roboto Medium'), local('Roboto-Medium'), url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmEU9fCxc4AMP6lbBP.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: local('Roboto Medium'), local('Roboto-Medium'), url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmEU9fChc4AMP6lbBP.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: local('Roboto Medium'), local('Roboto-Medium'), url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmEU9fBBc4AMP6lQ.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: local('Roboto Bold'), local('Roboto-Bold'), url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfCRc4AMP6lbBP.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: local('Roboto Bold'), local('Roboto-Bold'), url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfABc4AMP6lbBP.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: local('Roboto Bold'), local('Roboto-Bold'), url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfCBc4AMP6lbBP.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: local('Roboto Bold'), local('Roboto-Bold'), url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfBxc4AMP6lbBP.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: local('Roboto Bold'), local('Roboto-Bold'), url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfCxc4AMP6lbBP.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: local('Roboto Bold'), local('Roboto-Bold'), url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfChc4AMP6lbBP.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: local('Roboto Bold'), local('Roboto-Bold'), url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfBBc4AMP6lQ.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: local('Roboto Black'), local('Roboto-Black'), url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmYUtfCRc4AMP6lbBP.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: local('Roboto Black'), local('Roboto-Black'), url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmYUtfABc4AMP6lbBP.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: local('Roboto Black'), local('Roboto-Black'), url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmYUtfCBc4AMP6lbBP.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: local('Roboto Black'), local('Roboto-Black'), url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmYUtfBxc4AMP6lbBP.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: local('Roboto Black'), local('Roboto-Black'), url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmYUtfCxc4AMP6lbBP.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: local('Roboto Black'), local('Roboto-Black'), url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmYUtfChc4AMP6lbBP.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: local('Roboto Black'), local('Roboto-Black'), url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmYUtfBBc4AMP6lQ.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
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
