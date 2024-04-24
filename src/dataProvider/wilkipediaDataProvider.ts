import { fetchUtils } from "react-admin";

export const wilkipediaDataProvider = {
  getWilkipediaList: async (parameters = { search: "" }) => {
    const queryParams = new URLSearchParams({
      action: "opensearch",
      limit: "10",
      list: "search",
      search: parameters.search,
      origin: "*",
      format: "json",
    });
    const requestOptions = {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    };

    const url = `https://en.wikipedia.org/w/api.php?${queryParams.toString()}`;
    const { json } = await fetchUtils.fetchJson(url, requestOptions);
    console.log("json", json);
    const data = json[1].map((title, index) => {
      return { title, url: json[3][index] };
    });
    console.log("data", data);
    return { data };
  },
  getWilkipediaContent: async (parameters = { title: "" }) => {
    const { title } = parameters;
    const requestOptions = {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    };

    const queryParams = new URLSearchParams({
      action: "query",
      explaintext: "true",
      format: "json",
      prop: "extracts",
      redirects: "true",
      origin: "*",
      titles: title,
    });

    const url = `https://en.wikipedia.org/w/api.php?${queryParams.toString()}`;
    const { json } = await fetchUtils.fetchJson(url, requestOptions);

    const extract = json.query.pages[Object.keys(json.query.pages)[0]].extract;
    const contentWithoutExtraChars = extract
      .replace(/===/g, "=")
      .replace(/==/g, "=")
      .replace(/\n/g, " ")
      .replace(/\t/g, "");

    console.log("contentWithoutExtraChars", contentWithoutExtraChars);
    return { data: contentWithoutExtraChars };
  },
};
