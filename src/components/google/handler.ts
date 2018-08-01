import { ApiAiHandler, DialogflowInterface } from "assistant-apiai";
import {
  AuthenticationMixin,
  CardMixin,
  ChatBubblesMixin,
  injectionNames,
  MinimalRequestExtraction,
  RepromptsMixin,
  RequestContext,
  ResponseHandlerExtensions,
  SessionDataMixin,
  SuggestionChipsMixin,
} from "assistant-source";
import { inject, injectable } from "inversify";
import { DialogflowResponse } from "./conversation-interface/dialogflow-response";
import { GoogleInterface, GoogleSpecificHandable, GoogleSpecificTypes } from "./public-interfaces";

@injectable()
export class GoogleHandler<MergedTypes extends GoogleSpecificTypes>
  extends AuthenticationMixin(CardMixin(ChatBubblesMixin(RepromptsMixin(SessionDataMixin(SuggestionChipsMixin(ApiAiHandler))))))<MergedTypes>
  implements GoogleSpecificHandable<MergedTypes> {
  constructor(
    @inject(injectionNames.current.requestContext) requestContext: RequestContext,
    @inject(injectionNames.current.extraction) extraction: MinimalRequestExtraction,
    @inject(injectionNames.current.killSessionService) killSession: () => Promise<void>,
    @inject(injectionNames.current.responseHandlerExtensions)
    responseHandlerExtensions: ResponseHandlerExtensions<MergedTypes, GoogleSpecificHandable<MergedTypes>>
  ) {
    super(requestContext, extraction, killSession, responseHandlerExtensions);
  }

  public setGoogleList(list: MergedTypes["googleList"] | Promise<MergedTypes["googleList"]>): this {
    this.promises.googleList = { resolver: list };
    return this;
  }

  public setGoogleBrowsingCarousel(carousel: MergedTypes["googleBrowsingCarousel"] | Promise<MergedTypes["googleBrowsingCarousel"]>): this {
    this.promises.googleBrowsingCarousel = { resolver: carousel };
    return this;
  }

  public setGoogleCarousel(carousel: MergedTypes["googleCarousel"] | Promise<MergedTypes["googleCarousel"]>): this {
    this.promises.googleCarousel = { resolver: carousel };
    return this;
  }

  public setGoogleTable(table: MergedTypes["googleTable"] | Promise<MergedTypes["googleTable"]>): this {
    this.promises.googleTable = { resolver: table };
    return this;
  }

  /**
   * creates the google-specific response for Dialogflow
   * @param results current results
   */
  public getBody(results: Partial<MergedTypes>): DialogflowInterface.WebhookResponse<DialogflowResponse> {
    // Grab response for api.ai with empty results, so that no fullfilment texts are added
    const response: DialogflowInterface.WebhookResponse<Partial<DialogflowResponse>> = super.getBody({});

    let googlePayload: Partial<DialogflowResponse["google"]> = {};

    // call all methods one after the other
    [
      this.fillVoiceMessage,
      this.fillEndSession,
      this.fillAuthentication,
      this.fillCard,
      this.fillReprompts,
      this.fillSessionData,
      this.fillSuggestionChips,
      this.fillGoogleList,
      this.fillGoogleTable,
      this.fillGoogleCarousel,
      this.fillGoogleBrowsingCarousel,
    ].forEach((fn: (results: Partial<MergedTypes>, payload: Partial<DialogflowResponse["google"]>) => Partial<DialogflowResponse["google"]>) => {
      googlePayload = fn.bind(this)(results, googlePayload);
    });

    // set payload
    // tslint:disable-next-line:no-object-literal-type-assertion
    response.payload = { google: googlePayload } as DialogflowResponse;

    return response as DialogflowInterface.WebhookResponse<DialogflowResponse>;
  }

  /**
   * sets that a session should end
   * @param results current results
   * @param payload google-specific answer
   */
  private fillEndSession(results: Partial<MergedTypes>, payload: Partial<DialogflowResponse["google"]>): Partial<DialogflowResponse["google"]> {
    payload.expectUserResponse = !results.shouldSessionEnd; // to convert optional undefined to boolean

    return payload;
  }

  /**
   * sets that a session should get authenticated
   * @param results current results
   * @param payload google-specific answer
   */
  private fillAuthentication(results: Partial<MergedTypes>, payload: Partial<DialogflowResponse["google"]>): Partial<DialogflowResponse["google"]> {
    if (results.shouldAuthenticate) {
      payload.systemIntent = {
        intent: "actions.intent.SIGN_IN",
        data: {},
      };
    }
    return payload;
  }

  /**
   * fills a basic card
   * @param results current results
   * @param payload google-specific answer
   */
  private fillCard(results: Partial<MergedTypes>, payload: Partial<DialogflowResponse["google"]>): Partial<DialogflowResponse["google"]> {
    if (results.card) {
      if (!payload.richResponse) {
        payload.richResponse = this.createRichResponse();
      }

      // add card
      payload.richResponse.items!.push({
        basicCard: {
          title: results.card.title,
          subtitle: results.card.subTitle || undefined,
          formattedText: results.card.description,
          image: results.card.cardImage
            ? { url: results.card.cardImage, accessibilityText: results.card.cardAccessibilityText || results.card.description }
            : undefined,
        },
      });
    }

    return payload;
  }

  /**
   * sets voiceMessage with or without chat bubbles
   * @param results current results
   * @param payload google-specific answer
   */
  private fillVoiceMessage(results: Partial<MergedTypes>, payload: Partial<DialogflowResponse["google"]>): Partial<DialogflowResponse["google"]> {
    const currentPayload = payload;

    if (results.voiceMessage) {
      if (!currentPayload.richResponse) {
        currentPayload.richResponse = this.createRichResponse();
      }

      // first chatbubble is for voiceMessage
      if (results.chatBubbles && results.chatBubbles.length > 0) {
        results.chatBubbles.forEach((value, index, values) => {
          let currentItem: GoogleInterface.Item;

          if (index === 0) {
            currentItem = { simpleResponse: this.createSimpleResponse(results.voiceMessage!, value) };
          } else if (index === 1) {
            // add all remaining
            const remainingElements = values.splice(1).join(" ");
            currentItem = { simpleResponse: this.createSimpleResponse(remainingElements, remainingElements) };
          } else {
            return;
          }

          currentPayload.richResponse!.items!.push(currentItem);
        });
      } else {
        const currentItem = { simpleResponse: this.createSimpleResponse(results.voiceMessage) };
        currentPayload.richResponse.items!.push(currentItem);
      }
    }
    // if no voiceMessage is set use only chat-bubbles
    else if (results.chatBubbles && results.chatBubbles.length > 0) {
      if (!currentPayload.richResponse) {
        currentPayload.richResponse = this.createRichResponse();
      }

      results.chatBubbles.forEach((value, index) => {
        let currentItem: GoogleInterface.Item;

        currentItem = currentItem = { simpleResponse: this.createSimpleResponse(value) };

        currentPayload.richResponse!.items!.push(currentItem);
      });
    }

    return currentPayload;
  }

  /**
   * sets reprompts
   * @param results current results
   * @param payload google-specific answer
   */
  private fillReprompts(results: Partial<MergedTypes>, payload: Partial<DialogflowResponse["google"]>): Partial<DialogflowResponse["google"]> {
    if (results.reprompts && results.reprompts.length > 0) {
      payload.noInputPrompts = results.reprompts!.map(value => this.createSimpleResponse(value));
    }

    return payload;
  }

  /**
   * sets SessionData
   * @param results current results
   * @param payload google-specific answer
   */
  private fillSessionData(results: Partial<MergedTypes>, payload: Partial<DialogflowResponse["google"]>): Partial<DialogflowResponse["google"]> {
    // Add session data
    if (results.sessionData) {
      payload.userStorage = results.sessionData;
    }

    return payload;
  }

  /**
   * Adds SuggestionChips
   * @param results current results
   * @param payload google-specific answer
   */
  private fillSuggestionChips(results: Partial<MergedTypes>, payload: Partial<DialogflowResponse["google"]>): Partial<DialogflowResponse["google"]> {
    if (results.suggestionChips && results.suggestionChips.length > 0 && !results.shouldSessionEnd) {
      if (!payload.richResponse) {
        payload.richResponse = this.createRichResponse();
      }

      payload.richResponse.suggestions = results.suggestionChips.map(chip => {
        return {
          title: chip,
        };
      });
    }

    return payload;
  }

  private fillGoogleList(results: Partial<MergedTypes>, payload: Partial<DialogflowResponse["google"]>): Partial<DialogflowResponse["google"]> {
    if (results.googleList) {
      payload.systemIntent = {
        intent: "actions.intent.OPTION",
        data: {
          "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
          listSelect: results.googleList,
        },
      };
    }

    return payload;
  }

  private fillGoogleBrowsingCarousel(results: Partial<MergedTypes>, payload: Partial<DialogflowResponse["google"]>): Partial<DialogflowResponse["google"]> {
    if (results.googleBrowsingCarousel) {
      if (!payload.richResponse) {
        payload.richResponse = this.createRichResponse();
      }

      payload.richResponse.items!.push({
        carouselBrowse: results.googleBrowsingCarousel,
      });
    }

    return payload;
  }

  private fillGoogleCarousel(results: Partial<MergedTypes>, payload: Partial<DialogflowResponse["google"]>): Partial<DialogflowResponse["google"]> {
    if (results.googleCarousel) {
      payload.systemIntent = {
        intent: "actions.intent.OPTION",
        data: {
          "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
          carouselSelect: {
            items: results.googleCarousel,
          },
        },
      };
    }

    return payload;
  }

  private fillGoogleTable(results: Partial<MergedTypes>, payload: Partial<DialogflowResponse["google"]>): Partial<DialogflowResponse["google"]> {
    if (results.googleTable) {
      if (!payload.richResponse) {
        payload.richResponse = this.createRichResponse();
      }

      payload.richResponse.items!.push({
        tableCard: results.googleTable,
      });
    }

    return payload;
  }

  /**
   * creates an Object compatible to RichResponse
   */
  private createRichResponse(): GoogleInterface.RichResponse {
    return {
      items: [],
    };
  }

  /**
   * Creates a SimpleResponse from voiceMessage
   * @param voiceMessage current voiiceMessage
   * @param displayText optional text to display
   */
  private createSimpleResponse(voiceMessage: MergedTypes["voiceMessage"] | string, displayText?: string): GoogleInterface.SimpleResponse {
    let result: GoogleInterface.SimpleResponse;
    if (typeof voiceMessage !== "string") {
      // is either ssml or text
      result = voiceMessage.isSSML
        ? {
            ssml: voiceMessage.text,
          }
        : {
            textToSpeech: voiceMessage.text,
          };
    } else {
      result = {
        textToSpeech: voiceMessage,
      };
    }

    if (displayText) {
      result.displayText = displayText;
    }

    return result;
  }
}
