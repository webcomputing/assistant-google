import { VirtualAssistant } from "assistant-source";
import * as fs from "fs";
import { UserRefreshClient } from "google-auth-library";
import * as grpc from "grpc";
import { inject, injectable } from "inversify";
import { Component } from "inversify-components";
import { Base64 } from "js-base64";
import * as path from "path";
import { ASSISTANT_SERVICE, Configuration } from "./private-interfaces";
import { AssistantInterface, GoogleAssistResponse, GoogleOAuth2Credentials } from "./public-interfaces";

@injectable()
export class GoogleAssistant<MergedResponse extends GoogleAssistResponse> implements VirtualAssistant<MergedResponse> {
  private configuration: Configuration.Runtime;
  private grpcClient!: AssistantInterface.EmbeddedAssistantClient;
  private assistConfig!: AssistantInterface.AssistConfig;

  constructor(@inject("meta:component//google") componentMeta: Component<Configuration.Runtime>) {
    this.configuration = componentMeta.configuration;
  }

  /**
   * Initializes die Google Assistant Dialog State
   */
  public setup(): void {
    const config = new AssistantInterface.AssistConfig();

    // Specifies the desired format for the server to use when it returns audio_out messages.
    config.setAudioOutConfig(new AssistantInterface.AudioOutConfig());
    if (typeof config.getAudioInConfig !== "undefined") {
      config.getAudioOutConfig()!.setEncoding(1);
      config.getAudioOutConfig()!.setSampleRateHertz(16000);
      config.getAudioOutConfig()!.setVolumePercentage(100);
    }

    // Provides information about the current dialog state.
    config.setDialogStateIn(new AssistantInterface.DialogStateIn());
    if (typeof config.getDialogStateIn !== "undefined") {
      config.getDialogStateIn()!.setLanguageCode("en-US");
    }

    // Required Fields that identify the device to the Assistant.
    config.setDeviceConfig(new AssistantInterface.DeviceConfig());
    if (typeof config.getDeviceConfig !== "undefined") {
      config.getDeviceConfig()!.setDeviceId("default");
      config.getDeviceConfig()!.setDeviceModelId("default");
    }

    // Set the screen response
    config.setScreenOutConfig(new AssistantInterface.ScreenOutConfig());
    if (typeof config.getScreenOutConfig() !== "undefined") {
      config.getScreenOutConfig()!.setScreenMode(AssistantInterface.ScreenOutConfig.ScreenMode.PLAYING);
    }

    // Assign config and client
    this.assistConfig = config;
    this.grpcClient = this.createGRPCClient();
  }

  /**
   * Sends a request to Googles Assistant API
   * @param inputText Text to call with
   */
  public async send(inputText: string): Promise<any> {
    // Set Request
    const request = new AssistantInterface.AssistRequest();
    this.assistConfig.setTextQuery(inputText);
    request.setConfig(this.assistConfig);

    request.clearAudioIn();

    // Open duplex rpc stream
    const conversation = this.grpcClient.assist();

    return new Promise((resolve, reject) => {
      const response: GoogleAssistResponse = { text: "" };

      // Bind data listener
      conversation.on("data", (data: AssistantInterface.AssistResponse) => {
        if (data.hasDialogStateOut) {
          const dialogState = data.getDialogStateOut();
          const screenOut = data.getScreenOut();

          // Get Text from response
          if (typeof dialogState !== "undefined") {
            response.text = dialogState.getSupplementalDisplayText();
          }

          // Get Display output from response
          if (typeof screenOut !== "undefined") {
            if (screenOut.getFormat() === AssistantInterface.ScreenOut.Format.HTML) {
              response.display_html = Base64.decode(screenOut.getData_asB64());
            }
          }
        }
      });

      // Bind error listener
      conversation.on("error", error => {
        // Error => reject
        reject(error);
      });

      // Bind end listener
      conversation.on("end", () => {
        // Response ended, resolve with the whole response.
        resolve(response);
      });

      // Write message to request stream
      conversation.write(request);
      conversation.end();
    });
  }

  public teardown(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  /**
   * Create the gRPC connection between
   * AssistantJS and the Google Assistant Service API
   */
  private createGRPCClient(): AssistantInterface.EmbeddedAssistantClient {
    const auth = new UserRefreshClient();
    const credentialsPath = path.resolve(this.configuration.credentials);

    // Load OAuth2 credentials
    if (fs.existsSync(credentialsPath)) {
      const credentials: Partial<GoogleOAuth2Credentials> = require(credentialsPath);
      credentials.type = "authorized_user";
      auth.fromJSON(credentials);
    } else {
      throw new Error("No Google OAuth2 credentials found!. Abort...");
    }
    const sslCreds = grpc.credentials.createSsl();
    const callCreds = grpc.credentials.createFromGoogleCredential(auth);
    return new AssistantInterface.EmbeddedAssistantClient(ASSISTANT_SERVICE, grpc.credentials.combineChannelCredentials(sslCreds, callCreds));
  }
}
