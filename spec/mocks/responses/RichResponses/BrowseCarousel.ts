/**
 * Source: https://github.com/dialogflow/fulfillment-webhook-json/tree/4c7fa3dce6bd2d3ae6ae98bc4c3f479ed4fb9f56
 */
export const browseCarousel = {
  payload: {
    google: {
      expectUserResponse: true,
      richResponse: {
        items: [
          {
            carouselBrowse: {
              items: [
                {
                  title: "Title of item 1",
                  openUrlAction: {
                    url: "https://google.com",
                  },
                  description: "Description of item 1",
                  footer: "Item 1 footer",
                  image: {
                    url: "https://developers.google.com/actions/assistant.png",
                    accessibilityText: "Google Assistant Bubbles",
                  },
                },
                {
                  title: "Title of item 2",
                  openUrlAction: {
                    url: "https://google.com",
                  },
                  description: "Description of item 2",
                  footer: "Item 2 footer",
                  image: {
                    url: "https://developers.google.com/actions/assistant.png",
                    accessibilityText: "Google Assistant Bubbles",
                  },
                },
              ],
            },
          },
        ],
      },
      userStorage: '{"data":{}}',
    },
  },
  outputContexts: [
    {
      name: "projects/temperatureconvertersample/agent/sessions/518488a5-09f6-4a36-8950-942f595b70b8/contexts/_actions_on_google",
      lifespanCount: 99,
      parameters: {
        data: "{}",
      },
    },
  ],
};
