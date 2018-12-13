import {
  AccountLinkingStatus,
  HandlerProxyFactory,
  injectionNames,
  intent as Intent,
  PlatformSpecHelper,
  RequestContext,
  SpecHelper,
  VirtualAssistant,
  VirtualDevices,
} from "assistant-source";
import { GoogleAssistant } from "./components/google/google-assistant";
import { GoogleHandler } from "./components/google/handler";
import { Extraction, GoogleAssistResponse, GoogleDevice, GoogleSpecificHandable, GoogleSpecificTypes } from "./components/google/public-interfaces";

export class GoogleSpecHelper implements PlatformSpecHelper<GoogleSpecificTypes, GoogleSpecificHandable<GoogleSpecificTypes>, GoogleAssistResponse> {
  public devices: VirtualDevices;

  constructor(public specSetup: SpecHelper) {
    this.devices = this.setupDevices();
  }

  public setupDevices(): VirtualDevices {
    return {
      googleSpeaker: {
        additionalRequestContext: {
          body: { originalDetectIntentRequest: { payload: { surface: { capabilities: [{ name: "actions.capability.AUDIO_OUTPUT" }] } } } },
        },
        additionalExtractions: { device: "googleSpeaker" },
      },
      googlePhone: {
        additionalRequestContext: {
          body: { originalDetectIntentRequest: { payload: { surface: { capabilities: [{ name: "actions.capability.SCREEN_OUTPUT" }] } } } },
        },
        additionalExtractions: { device: "googlePhone" },
      },
    };
  }

  public async pretendIntentCalled(intent: Intent, device?: GoogleDevice): Promise<GoogleSpecificHandable<GoogleSpecificTypes>> {
    const additionalExtractions = device ? this.devices[device].additionalExtractions : {};
    const additionalRequestContext = device ? this.devices[device].additionalRequestContext : {};

    const extraction: Extraction = {
      intent,
      platform: "google",
      sessionID: "apiai-mock-session-id",
      sessionData: '{"mock-google-user-key":"my-google-user-value"}',
      language: "en",
      spokenText: "this is the spoken text",
      oAuthToken: "mock-google-oauth",
      accountLinkingStatus: AccountLinkingStatus.OK,
      device: "phone",
      additionalParameters: {},
      ...additionalExtractions,
    };

    const context: RequestContext = {
      id: "my-request-id",
      method: "POST",
      path: "/apiai",
      body: {},
      headers: {},
      // tslint:disable-next-line:no-empty
      responseCallback: () => {},
      ...additionalRequestContext,
    };

    this.specSetup.createRequestScope(extraction, context);

    // Bind handler as singleton
    this.specSetup.assistantJs.container.inversifyInstance.unbind("google:current-response-handler");
    this.specSetup.assistantJs.container.inversifyInstance
      .bind("google:current-response-handler")
      .to(GoogleHandler)
      .inSingletonScope();

    const proxyFactory = this.specSetup.assistantJs.container.inversifyInstance.get<HandlerProxyFactory>(injectionNames.handlerProxyFactory);

    const currentHandler = this.specSetup.assistantJs.container.inversifyInstance.get<GoogleSpecificHandable<GoogleSpecificTypes>>(
      "google:current-response-handler"
    );
    const proxiedHandler = proxyFactory.createHandlerProxy(currentHandler);

    return proxiedHandler;
  }

  public callAssistant(utterance: string): Promise<GoogleAssistResponse> {
    const googleAssistant: GoogleAssistant<GoogleAssistResponse> = this.specSetup.assistantJs.container.inversifyInstance.get("google:virtual-assistant");
    return googleAssistant.send(utterance);
  }

  public async prepareAssistant(): Promise<void> {
    const googleAssistant: GoogleAssistant<GoogleAssistResponse> = this.specSetup.assistantJs.container.inversifyInstance.get("google:virtual-assistant");
    return googleAssistant.setup();
  }
}
