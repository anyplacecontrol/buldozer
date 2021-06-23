import React from "react";
import {render} from "react-dom";
import {AppContainer} from "react-hot-loader";
import configureStore, {history} from "./redux/configureStore";
import Root from "./components/Root/Root";

// styles
import './assets/css/main.css'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
import './assets/css/styles.css'; // todo: put to main, minify and delete in production mode
import './assets/css/loader.css';

const store = configureStore();

render(
  <AppContainer>
    <Root
      store={store}
      history={history}
    />
  </AppContainer>,
  document.getElementById("main")
);

if (module.hot) {
  module.hot.accept("./components/Root/Root", () => {
    const NewRoot = require("./components/Root/Root").default;
    render(
      <AppContainer>
        <NewRoot
          store={store}
          history={history}
        />
      </AppContainer>,
      document.getElementById("main")
    );
  });
}


