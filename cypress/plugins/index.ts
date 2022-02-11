/// <reference types="cypress" />

import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
) => {
  const isDev = config.watchForFileChanges;
  const port = process.env.PORT ?? (isDev ? "3000" : "8811");
  const configOverrides: Partial<Cypress.PluginConfigOptions> = {
    baseUrl: `http://localhost:${port}`,
    viewportWidth: 1030,
    viewportHeight: 800,
    integrationFolder: "cypress/e2e",
    video: !process.env.CI,
    screenshotOnRunFailure: !process.env.CI,
  };
  Object.assign(config, configOverrides);

  on("before:browser:launch", (browser, options) => {
    if (browser.name === "chrome") {
      options.args.push(
        "--no-sandbox",
        "--allow-file-access-from-files",
        "--use-fake-ui-for-media-stream",
        "--use-fake-device-for-media-stream",
        "--use-file-for-fake-audio-capture=cypress/fixtures/sample.wav"
      );
    }
    return options;
  });

  let socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  const roomId = "room-id-1";
  let lastMsg: {
    id: string;
    roomId: string;
    message: string;
  };
  on("task", {
    log(message) {
      console.log(message);
      return null;
    },
    connect() {
      socket = io("http://localhost:3000/messages");
			console.log("connect: ", socket.id);
      socket.on("serverMsg", (msg) => {
				console.log("[cypress serverMsg] > socket.id ", socket.id)
        if (msg.id) {
          lastMsg = msg;
					console.log("serverMsg > ", msg);
        } else {
          if (socket?.id) {
            // 相手との接続を確立させるために空文字列を送信する
            socket?.emit("post", {
              id: socket.id,
              roomId,
              message: "",
            });
          }
        }
      });
			return null;
    },
    post(text: string) {
      socket.emit("post", {
        id: socket.id ?? "user-id-1",
        roomId,
        message: text,
      });
			return null;
    },
		getLastMessage() {
			return lastMsg.message || null
		},
		getSocketId() {
			return socket.id || "";
		}
  });

  return config;
};
