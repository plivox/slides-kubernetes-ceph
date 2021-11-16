import Reveal from "./reveal";
import { io } from "socket.io-client";
import { createHash } from "crypto";

export const multiplexConfig = {
  id: process.env.MULTIPLEX_ID || "",
  secret: process.env.MULTIPLEX_SECRET || "",
  url: process.env.MULTIPLEX_URL || "",
};

export const checkPassword = (argName) => {
  if (!process.env.MULTIPLEX_PASSWORD || process.env.MULTIPLEX_PASSWORD === "")
    return false;

  const searchParams = new URLSearchParams(window.location.search);
  if (!searchParams.has(argName)) return false;

  const password = searchParams.get(argName);
  if (password === "") return false;

  const buf = Buffer.from(process.env.MULTIPLEX_PASSWORD, "base64");
  const hash = createHash("sha256").update(password).digest("hex");

  if (buf.toString("hex") === hash) return true;
  return false;
};

localStorage.debug = "*";

export const speaker = () => {
  // Don't emit events from inside of notes windows
  if (window.location.search.match(/receiver/gi)) {
    return;
  }

  const socket = io(multiplexConfig.url);

  const emit = (event) => {
    console.log(event.content);

    socket.emit("multiplex-statechanged", {
      secret: multiplexConfig.secret,
      id: multiplexConfig.id,
      state: Reveal.getState(),
      content: (event || {}).content,
    });
  };

  // Post once the page is loaded, so the client follows also on "open URL".
  window.addEventListener("load", emit);

  // Broadcast custom events sent by other plugins
  document.addEventListener("send", emit);

  // Monitor events that trigger a change in state
  for (const eventName of [
    "slidechanged",
    "fragmentshown",
    "fragmenthidden",
    "overviewhidden",
    "overviewshown",
    "paused",
    "resumed",
  ]) {
    Reveal.on(eventName, emit);
  }
};

export const viewer = () => {
  const socket = io(multiplexConfig.url);

  socket.on(multiplexConfig.id, function (message) {
    console.log(message);

    if (message.id !== multiplexConfig.id) {
      return;
    }

    // if (window.location.host === "localhost:1947") {
    //   return;
    // }

    if (message.state) {
      Reveal.setState(message.state);
    }

    if (message.content) {
      // forward custom events to other plugins
      const event = new CustomEvent("received");
      event.content = message.content;
      document.dispatchEvent(event);
    }
  });
};
