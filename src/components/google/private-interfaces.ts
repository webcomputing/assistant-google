export namespace Configuration {
  /** Configuration defaults -> all of these keys are optional for user */
  // tslint:disable-next-line:no-empty-interface
  export interface Defaults {
    /**
     * Path to your Google Application Credentials
     */
    credentials: string;
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
