import React from "react";
import Axios from "axios";

import { BUILD_CONF } from "./Conf";
console.log({ BUILD_CONF });

const axios = Axios.create({
  baseURL: "http://localhost:3000",
});

export default class App extends React.Component {
  componentDidMount = async () => {
    await axios("/healthcheck")
      .catch(() => {
        console.error("server error");
      })
      .then((resp) => {
        console.log("/healthcheck", resp);
      });
    axios("/api/users").then((resp) => {
      const users = resp.data;
      console.log("/api/users", { users });
    });
  };
  render() {
    return <div className="main">Hello webpack</div>;
  }
}
