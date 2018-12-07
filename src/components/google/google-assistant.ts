import { E2ETesting } from "assistant-source";
import { UserRefreshClient } from "google-auth-library";
import * as grpc from "grpc";
import { inject, injectable } from "inversify";
import { Component } from "inversify-components";
import { ASSISTANT_SERVICE, Configuration } from "./private-interfaces";
import { AssistantInterface, GoogleAssistRequest, GoogleAssistResponse } from "./public-interfaces";

@injectable()
export class GoogleAssistant<MergedResponse extends GoogleAssistResponse> implements E2ETesting.VirtualAssistant<MergedResponse> {
  private configuration: Configuration.Runtime;

  constructor(@inject("meta:component//google") componentMeta: Component<Configuration.Runtime>) {
    this.configuration = componentMeta.configuration;
  }

  /**
   * Initializes die Google Assistant Dialog State
   */
  public setup(): Promise<void> {
    return new Promise((resolve, reject) => {
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

      // // Assign config and client
      // this.assistConfig = config;
      // this.grpcClient = this.createGRPCClient();
    });
  }

  public teardown(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public send(inputText: string): Promise<Partial<MergedResponse>> {
    throw new Error("Method not implemented.");
  }
  public beforeSend(callback: () => ): void | Promise<void> {
    throw new Error("Method not implemented.");
  }
  public afterSend(callback: () => ): void | Promise<void> {
    throw new Error("Method not implemented.");
  }

  /**
   * Create the gRPC connection between
   * AssistantJS and the Google Assistant Service API
   */
  public createGRPCClient(): AssistantInterface.EmbeddedAssistantClient {
    // Load OAuth2 credentials
    const auth = new UserRefreshClient(this.configuration.client_id, this.configuration.client_secret, this.configuration.refresh_token);
    const sslCreds = grpc.credentials.createSsl();
    const callCreds = grpc.credentials.createFromGoogleCredential(auth);
    return new AssistantInterface.EmbeddedAssistantClient(ASSISTANT_SERVICE, grpc.credentials.combineChannelCredentials(sslCreds, callCreds));
  }
}
