const showTilte = (event) => {
  const titleElement = document.getElementById("title");

  if (event.currentSlide.classList.contains("intro")) {
    titleElement.classList.add("in");
  } else {
    titleElement.classList.remove("in");
  }
};

const revealBaseConfig = {
  multiplex: {
    secret: "16359841097911915303",
    id: "d3cec6fbbb38d94d",
    url: "https://reveal-multiplex.glitch.me/",
  },
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
  plugins: [RevealMarkdown, RevealHighlight, RevealNotes],
};

const localDomains = ["localhost", "127.0.0.1"];

const revealSpecConfig = () => {
  if (localDomains.includes(window.location.hostname)) {
    // Speaker Presentation
    return {
      dependencies: [
        {
          src: "https://reveal-multiplex.glitch.me/socket.io/socket.io.js",
          async: true,
        },
        { src: "https://reveal-multiplex.glitch.me/master.js", async: true },
      ],
    };
  }

  // Client Presentation
  return {
    dependencies: [
      {
        src: "https://reveal-multiplex.glitch.me/socket.io/socket.io.js",
        async: true,
      },
      { src: "https://reveal-multiplex.glitch.me/client.js", async: true },
    ],
  };
};

Reveal.initialize({ ...revealBaseConfig, ...revealSpecConfig() });

Reveal.on("ready", (event) => {
  showTilte(event);
});

Reveal.on("slidechanged", (event) => {
  showTilte(event);
});
