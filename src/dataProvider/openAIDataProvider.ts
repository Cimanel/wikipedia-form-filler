import merge from "lodash/merge";
import { fetchUtils } from "react-admin";

const DEFAULT_PARAMS = {
  model: "gpt-3.5-turbo-0125",
  temperature: 0.5,
  max_tokens: 256,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
};

const MESSAGE_MAX_TOKENS = 16385;

const VITE_OPEN_AI_KEY = import.meta.env.VITE_OPEN_AI_KEY;

const OPEN_AI_ENDPOINT = "https://api.openai.com/v1/chat/completions";

export const openAIDataProvider = {
  getOpenAIValuesFromContent: async (content: string, keys: [string]) => {
    const messageWithoutContent = `fields ${keys.join(",")}.text:`;
    console.log("iiiiiiiiiiiiiiiiiii");
    const groups = tokenizeContent(content, messageWithoutContent);
    let result = {};
    for (const group of groups) {
      //fetchopenai for each group

      const message = `${messageWithoutContent}${group}`;
      const data = await fetchOpenAI(message);
      const sanitizedData = removeNullUndefined(data);
      console.log("sanitizedData", sanitizedData);
      result = { ...sanitizedData, ...result };
    }
    return { data: result };
  },
};

const fetchOpenAI = async (message: string) => {
  const body = merge(DEFAULT_PARAMS, {
    messages: [
      {
        role: "system",
        content:
          "From the text below, return given string or number field values in JSON (no object as field value). Use 'null' if absent, replace if better. No extra fields.",
      },
      { role: "user", content: message },
    ],
  });
  const requestOptions = {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(body),
  };
  requestOptions.headers.set(
    "Authorization",
    // eslint-disable-next-line no-undef
    `Bearer ${VITE_OPEN_AI_KEY}`
  );
  const { json } = await fetchUtils.fetchJson(OPEN_AI_ENDPOINT, requestOptions);

  return JSON.parse(json.choices[0]?.message?.content);
};

const tokenizeContent = (content: string, messageWithoutContent: string) => {
  const messageWithoutContentWords = messageWithoutContent.split(" ");
  //split content in words
  const words = content.split(" ");
  //crete group of words respecting 4000 tokens (100 tokens = 75 words)
  const max_words =
    (MESSAGE_MAX_TOKENS / 100) * 75 - messageWithoutContentWords.length;

  const groups = words.reduce(
    (acc, word) => {
      if (acc[acc.length - 1].length + word.length < max_words) {
        acc[acc.length - 1].push(word);
      } else {
        acc.push([word]);
      }
      return acc;
    },
    [[]]
  );
  const agregatedGroups = groups.map((group) => group.join(" "));
  console.log("groups", agregatedGroups);
  return agregatedGroups;
};

const removeNullUndefined = (obj) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (
      value !== null &&
      value !== undefined &&
      value !== "null" &&
      value !== "undefined"
    ) {
      acc[key] = typeof value === "object" ? removeNullUndefined(value) : value;
    }
    return acc;
  }, {});
};
