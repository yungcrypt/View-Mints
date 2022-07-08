import {createGlobalStyle} from "styled-components";
import Theme from "./theme/theme";

export const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'Silkscreen';
  src: url(${Theme.typography.url}) format('woff2');
}

.MuiBackdrop-root {
    background: rgb(0,0,0,0.8);
}

.fade { 
      -moz-transition: all .2s ease-in;
          -o-transition: all .2s ease-in;
              -webkit-transition: all .2s ease-in;
                  transition: all .2s ease-in;
                      background-color: transparent; 
}
.fade:hover {
    background-color: black;
}

.MuiTypography-caption {
  font-family: 'Silkscreen' !important;
  color: white;
}
.MuiTypography-body2 {
  font-family: 'Silkscreen' !important;
  color: white;
}
button[class*="CTAButton"] {
  font-family: 'Silkscreen' !important;
  color: white;
  font-size:30px;
  border: 2px solid white;
}
.MuiTypography-colorTextSecondary {
  font-family: 'Silkscreen' !important;
  color: white;
}
.MuiTypography-colorTextPrimary {
  font-family: 'Silkscreen' !important;
  color: white;
}

.wallet-adapter-button {
  background-color: ${Theme.palette.secondary.main} !important;
  color: white;
}
.wallet-adapter-button-trigger {
  color: white;
}
.wallet-adapter-modal-wrapper {
    box-sizing: border-box;
    max-width: 600px;
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.6);
    flex: 1;
}
#cmui-modal {
  font-family: "Silkscreen" !important;
  color: white;
  background:none;
}

.bg-solid {
  background-color: ${Theme.palette.secondary.light} !important;
  min-height: 100vh;
}

.bg {
  @media (max-width: 600px) {
    background-color: black;
    background-size: cover;
    background-position: center;
  }
  @media (min-width: 600px) {
    background-color: black;
    background-size: cover;
    background-position: center;
  }
  min-height: 100vh;
}
.App-header {
  @media (max-width: 600px) {
    background-color: black;
    background-size: cover;
    background-position: center;
  }
  @media (min-width: 600px) {
    background-color: black;
    background-size: cover;
    background-position: center;
  }
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top:40px;
  color: white;
  overflow-x:hidden;
}
#topbar {
    background-color: black;
  color: orange;
}
#matrixrain-column {
  font-family: "Silkscreen" !important;
  color: ${Theme.palette.secondary.main};
}
#matrixrain-bg {
  background: ${Theme.palette.primary.main};
}

h2, p {
  color: ${Theme.typography.body1.color} !important;
}
html,
body {
  font-family: "Silkscreen" !important;
  padding: 0;
  margin: 0;

  overflow-x:hidden;
}

img {
border-radius: 4px;
height: auto;
}

.grid-item {
  width: 100%;
  height: 100%;
  z-index: 1000000;
  box-sizing: border-box;
}

.dropzone {
  flex: 1;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
}
.MuiInputBase-input {
color: ${Theme.typography.body1.color};
}

.mint-container {
  width: 30vw;
  color: white;
}

`;
