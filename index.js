const path = require("path");
const fastify = require("fastify");
const fastifySocketIO = require("fastify-socket.io");
const fastifyStatic = require("fastify-static");
const crypto = require("crypto");

const port = process.env.PORT || 3000;

const options = {
  publicDir: path.join(__dirname, "public"),
  logger: true,
  cors: {
    origin: `http://127.0.0.1:${port}`,
    methods: ["GET", "POST"],
  },
};

const createHash = (secret) => {
  return crypto.createCipher("blowfish", secret).final("hex");
};

const server = fastify({ logger: options.logger });
server.register(fastifySocketIO, { cors: options.cors });
server.register(fastifyStatic, { root: options.publicDir });

server.ready().then(() => {
  server.io.on("connection", (socket) => {
    socket.on("multiplex-statechanged", (data) => {
      if (typeof data.secret == "undefined" || data.secret === "") {
        return;
      }

      if (createHash(data.secret) === data.id) {
        data.secret = null;
        socket.broadcast.emit(data.id, data);
      }
    });
  });
});

const run = async () => {
  try {
    await server.listen(port);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
run();
