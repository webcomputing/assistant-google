import {
  ApiAiSpecificHandable,
  ApiAiSpecificTypes,
  DialogflowInterface,
  DialogflowRequestContext,
  ExtractionInterface as ApiAiExtraction,
} from "assistant-apiai";
import { OptionalExtractions } from "assistant-source";
import * as GoogleInterface from "./conversation-interface";
import { Configuration } from "./private-interfaces";

/** Configuration of google component */
export interface GoogleConfiguration extends Partial<Configuration.Defaults>, Configuration.Required {}

/** Property describing the configuration of the google component */
export interface GoogleConfigurationAttribute {
  google?: GoogleConfiguration;
}

/** Possible devices this extractor can return */
export type Device = "phone" | "speaker";

export interface Extraction
  extends ApiAiExtraction,
    OptionalExtractions.SessionData,
    OptionalExtractions.Device,
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

  /**
   * Note: At the moment this will return a HTTP status code of 401. This will result in a error message, that your action is not responding at the moment.
   * At the moment it is not possible to set a custom message here.
   */
  revokeGoogleAccountLinking(): this;
}

export interface GoogleRequestContext extends DialogflowRequestContext {
  body: DialogflowInterface.WebhookRequest<GoogleInterface.AppRequest>;
}

export { GoogleInterface };
