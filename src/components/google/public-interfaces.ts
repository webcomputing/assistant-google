import {
  ApiAiSpecificHandable,
  ApiAiSpecificTypes,
  DialogflowInterface,
  DialogflowRequestContext,
  ExtractionInterface as ApiAiExtraction,
} from "assistant-apiai";
import { E2ETesting, OptionalExtractions } from "assistant-source";
import * as AssistantInterface from "./assistant-interface";
import * as GoogleInterface from "./conversation-interface";
import { Configuration } from "./private-interfaces";

/** Configuration of google component */
export interface GoogleConfiguration extends Partial<Configuration.Defaults>, Configuration.Required {}

/** Property describing the configuration of the google component */
export interface GoogleConfigurationAttribute {
  google?: GoogleConfiguration;
}

/** Possible devices this extractor can return */
export type GoogleDevice = "googlePhone" | "googleSpeaker";

export interface Extraction
  extends ApiAiExtraction,
    OptionalExtractions.SessionData,
    OptionalExtractions.Device,
    OptionalExtractions.TemporalAuth,
    OptionalExtractions.OAuth,
    OptionalExtractions.AccountLinking {}

/**
 * Add custom types here
 */
export interface GoogleSpecificTypes extends ApiAiSpecificTypes {
  card: ApiAiSpecificTypes["card"] & {
    /**
     * Subtitle for Google Basic Card
     */
    subTitle?: string;

    /**
     * accessibility text for image in Card
     */
    cardAccessibilityText?: string;

    /**
     * Button to link to another webpage
     */
    button?: {
      title: string;
      link: string;
    };
  };

  /**
   * Card with List
   *
   * see: https://developers.google.com/actions/assistant/responses#list
   */
  googleList: GoogleInterface.ValueSpecifications.ListSelect;

  /**
   * Caraousel for web base devices
   *
   * see: https://developers.google.com/actions/assistant/responses#browsing_carousel
   */
  googleBrowsingCarousel: GoogleInterface.CarouselBrowse;

  /**
   * Carousel for selection in multiple elements
   *
   * https://developers.google.com/actions/assistant/responses#carousel
   */
  googleCarousel: GoogleInterface.ValueSpecifications.CarouselSelectCarouselItem[];

  /**
   * Table
   *
   * see: https://developers.google.com/actions/assistant/responses#table_card
   */
  googleTable: GoogleInterface.TableCard;
}

/**
 * Add custom methods for here
 */
export interface GoogleSpecificHandable<CustomTypes extends GoogleSpecificTypes> extends ApiAiSpecificHandable<CustomTypes> {
  setGoogleList(list: CustomTypes["googleList"] | Promise<CustomTypes["googleList"]>): this;
  setGoogleBrowsingCarousel(carousel: CustomTypes["googleBrowsingCarousel"] | Promise<CustomTypes["googleBrowsingCarousel"]>): this;
  setGoogleCarousel(carousel: CustomTypes["googleCarousel"] | Promise<CustomTypes["googleCarousel"]>): this;

  /**
   * Note: The table card feature is currently in developer preview.
   * During the developer preview, you can test responses with table cards in the Action Console simulator,
   * but users will not see the cards in the production version.
   * @param table
   */
  setGoogleTable(table: CustomTypes["googleTable"] | Promise<CustomTypes["googleTable"]>): this;
}

export interface GoogleRequestContext extends DialogflowRequestContext {
  body: DialogflowInterface.WebhookRequest<GoogleInterface.AppRequest>;
}

/**
 * The top-level message sent by AssistantJS to the Google Assistant API
 * https://developers.google.com/assistant/sdk/reference/rpc/google.assistant.embedded.v1alpha2#google.assistant.embedded.v1alpha2.AssistRequest
 */
export interface GoogleAssistRequest extends E2ETesting.BasicAssistRequest {
  /**
   * The config message provides information to the recognizer that specifies how to process the request.
   */
  config: AssistantInterface.AssistConfig;
}

/**
 * The top-level message received by the client. A series of one or more AssistResponse messages are streamed back to the client.
 */
export interface GoogleAssistResponse extends E2ETesting.BasicAssistResponse {
  text: string;
  dialog_state_out: AssistantInterface.DialogStateOut;
}

/**
 * This interface represents a Google Assistant Device
 */
export interface GoogleAssistantDevice {
  name: string;
  id: string;
  nickname: string;
  model_id: string;
  client_type: "CLIENT_TYPE_UNSPECIFIED" | "SDK_SERVICE" | "SDK_LIBRARY";
}

/** Exports Google Conversation and Google Assistant API  */
export { GoogleInterface };
export { AssistantInterface };
