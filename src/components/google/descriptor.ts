import { RequestExtractor, VirtualAssistant } from "assistant-source";
import { ComponentDescriptor } from "inversify-components";
import { Extractor } from "./extractor";
import { GoogleAssistant } from "./google-assistant";
import { GoogleHandler } from "./handler";
import { COMPONENT_NAME, Configuration } from "./private-interfaces";

export let descriptor: ComponentDescriptor<Configuration.Defaults> = {
  name: COMPONENT_NAME,
  bindings: {
    root: (bindService, lookupService) => {
      // Bind Request Extractor
      bindService.bindExtension<RequestExtractor>(lookupService.lookup("core:unifier").getInterface("requestProcessor")).to(Extractor);

      // Bind Virtual Assistant
      bindService.bindExtension<VirtualAssistant<any>>(lookupService.lookup("core:unifier").getInterface("virtualAssistant")).to(GoogleAssistant);
    },
    request: bindService => {
      bindService.bindGlobalService("current-response-handler").to(GoogleHandler);
    },
  },
};
