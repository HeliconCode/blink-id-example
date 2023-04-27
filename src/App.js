import React from "react";
import logo from "./logo.svg";
import {
  applyPolyfills,
  defineCustomElements,
} from "@microblink/blinkid-in-browser-sdk/ui/loader";
import "./App.css";

function App() {
  const el = React.useRef(null);

  React.useEffect(() => {
    applyPolyfills().then(() => {
      defineCustomElements().then(() => {
        el.current.licenseKey = "";
        el.current.recognizers = ["BlinkIdMultiSideRecognizer"];
        el.current.recognizerOptions = {
          BlinkIdMultiSideRecognizer: {
            returnFullDocumentImage: true,
            returnFullDocumentFrontImage: true,
            returnFullDocumentBackImage: true,
            returnFaceImage: true,
            returnSignatureImage: true,
          },
        };
        // el.current.recognizerOptions = {
        //   BlinkIdSingleSideRecognizer: {
        //     returnFullDocumentImage: true,
        //     returnFaceImage: true,
        //   },
        // };
        // el.current.recognizers = [{
        //   recognizerType: "BlinkIdMultiSideRecognizer",
        //   // returnFullDocumentImage: true,
        // }];

        // Engine location depends on the actual location of WebAssembly resources
        el.current.engineLocation = window.location.origin + "/resources";
        // el.current.engineLocation = window.location.origin + `/resources/blinkid.worker.min.js`;
        // el.current.settings = {
        //   returnFullDocumentImage: true,
        // }
        // console.log('>>>>>>>>>>>>current: ', el.current.recognizers);
        // console.log('>>>>>>>>>>>>current.settings: ', el.current.settings);
        // console.log('>>>>>>>>>>>>current.translations: ', el.current.translations);

        el.current.addEventListener("ready", (ev) => {
          console.log("ready.1: ", ev.details);
          console.log("ready.2: ", ev);
        });

        el.current.addEventListener("scanSuccess", (ev) => {
          console.log("scanSuccess.1: ", ev.details);
          console.log("scanSuccess.2: ", ev);
          console.log("scanSuccess.3: ", JSON.stringify(ev));
        });

        el.current.addEventListener("scanError", (ev) => {
          console.log("scanError", ev.details);
        });

        el.current.addEventListener("fatalError", (ev) => {
          console.log("fatalError", ev.details);
        });
      });
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <blinkid-in-browser ref={el}></blinkid-in-browser>
      </header>
    </div>
  );
}

export default App;
