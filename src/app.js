import Reveal from "./reveal";
import { multiplexConfig, checkPassword, speaker, viewer } from "./multiplex";
import RevealNotes from "./plugin/notes/plugin";
import RevealMarkdown from "./plugin/markdown/plugin";
import RevealHighlight from "./plugin/highlight/plugin";

if (module.hot) {
  module.hot.accept();
}

const showTilte = (event) => {
  const titleElement = document.getElementById("title");

  if (event.currentSlide.classList.contains("intro")) {
    titleElement.classList.add("in");
  } else {
    titleElement.classList.remove("in");
  }
};

const hasSpeakerMode = checkPassword("password");

Reveal.initialize({
  multiplex: multiplexConfig,
  hash: true,
  history: false,
  margin: 0.2,
  minScale: 0.2,
  maxScale: 1.2,
  center: true,
  touch: true,
  disableLayout: false,
  autoAnimateDuration: 1.5,
  backgroundTransition: "slide",
  preloadIframes: true,
  ...(() => {
    if (hasSpeakerMode) {
      return {
        plugins: [RevealMarkdown, RevealHighlight, RevealNotes],
      };
    }
    return {
      plugins: [RevealMarkdown, RevealHighlight],
    };
  })(),
});

Reveal.on("ready", (event) => {
  showTilte(event);
});

Reveal.on("slidechanged", (event) => {
  showTilte(event);
});

// Multiplex mode
if (hasSpeakerMode) {
  speaker();
} else {
  viewer();
}
