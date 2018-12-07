export namespace Configuration {
  /** Configuration defaults -> all of these keys are optional for user */
  // tslint:disable-next-line:no-empty-interface
  export interface Defaults {
    /** The client ID for your application. You can find this value in the API Console. */
    client_id: string;
    /** The client secret obtained from the API Console. */
    client_secret: string;
    /**
     * A token that you can use to obtain a new access token.
     * Refresh tokens are valid until the user revokes access. Note that refresh tokens are always returned for devices.
     */
    refresh_token: string;
    /** Authorization type */
    type: "authorized_user" | "service_account";
  }

  /** Required configuration options, no defaults are used here */
  // tslint:disable-next-line:no-empty-interface
  export interface Required {}

  /** Available configuration settings in a runtime application */
  export interface Runtime extends Defaults, Required {}
}

/** Name of component (to make no typos) */
export const COMPONENT_NAME = "google";

/** Name of the Google Assistant API Service  */
export const ASSISTANT_SERVICE = "embeddedassistant.googleapis.com";
