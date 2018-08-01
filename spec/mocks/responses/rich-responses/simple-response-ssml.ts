/**
 * Source: https://github.com/dialogflow/fulfillment-webhook-json/tree/4c7fa3dce6bd2d3ae6ae98bc4c3f479ed4fb9f56
 */
export const impleResponseSsml = {
  payload: {
    google: {
      expectUserResponse: true,
      richResponse: {
        items: [
          {
            simpleResponse: {
              ssml:
                '<speak>Here are <say-as interpret-as="characters">SSML</say-as> samples. I can pause <break time="3" />. I can play a sound <audio src="https://actions.google.com/sounds/v1/alarms/winding_alarm_clock.ogg">your wave file</audio>. I can speak in cardinals. Your position is <say-as interpret-as="cardinal">10</say-as> in line. Or I can speak in ordinals. You are <say-as interpret-as="ordinal">10</say-as> in line. Or I can even speak in digits. Your position in line is <say-as interpret-as="digits">10</say-as>. I can also substitute phrases, like the <sub alias="World Wide Web Consortium">W3C</sub>. Finally, I can speak a paragraph with two sentences. <p><s>This is sentence one.</s><s>This is sentence two.</s></p></speak>',
              displayText: "This is a SSML sample. Make sure your sound is enabled to hear the demo",
            },
          },
        ],
      },
    },
  },
};
