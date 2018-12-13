import { VirtualAssistant } from "assistant-source";
import * as fs from "fs";
import { UserRefreshClient } from "google-auth-library";
import * as grpc from "grpc";
import { inject, injectable } from "inversify";
import { Component } from "inversify-components";
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

    // Assign config and client
    this.assistConfig = config;
    this.grpcClient = this.createGRPCClient();
  }

  public async send(inputText: string): Promise<Partial<MergedResponse>> {
    // Set Request
    const request = new AssistantInterface.AssistRequest();
    this.assistConfig.setTextQuery(inputText);
    request.setConfig(this.assistConfig);

    request.clearAudioIn();

    // Open duplex rpc stream
    const conversation = this.grpcClient.assist();

    return new Promise((resolve, reject) => {
      const response: GoogleAssistResponse = { text: "" };

      conversation.on("data", (data: AssistantInterface.AssistResponse) => {
        if (data.hasDialogStateOut) {
          const dialogState = data.getDialogStateOut();
          if (typeof dialogState !== "undefined") {
            response.text = dialogState.getSupplementalDisplayText();
          }
        }
      });

      conversation.on("end", data => {
        // Response ended, resolve with the whole response.
        resolve(response);
      });
      conversation.on("error", error => {
        // Error => reject
        reject(error);
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
