/**
 * Source: https://github.com/dialogflow/fulfillment-webhook-json/tree/4c7fa3dce6bd2d3ae6ae98bc4c3f479ed4fb9f56
 */
export const carouselResponse = {
  payload: {
    google: {
      expectUserResponse: true,
      richResponse: {
        items: [
          {
            simpleResponse: {
              textToSpeech: "Choose a item",
            },
          },
        ],
      },
      systemIntent: {
        intent: "actions.intent.OPTION",
        data: {
          "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
          carouselSelect: {
            items: [
              {
                optionInfo: {
                  key: "first title",
                },
                description: "first description",
                image: {
                  url: "https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png",
                  accessibilityText: "first alt",
                },
                title: "first title",
              },
              {
                optionInfo: {
                  key: "second",
                },
                description: "second description",
                image: {
                  url: "https://lh3.googleusercontent.com/Nu3a6F80WfixUqf_ec_vgXy_c0-0r4VLJRXjVFF_X_CIilEu8B9fT35qyTEj_PEsKw",
                  accessibilityText: "second alt",
                },
                title: "second title",
              },
            ],
          },
        },
      },
    },
  },
};
