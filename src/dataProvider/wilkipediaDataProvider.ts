export const wilkipediaDataProvider = {
  getWilkipediaList: async (parameters = { search: "" }) => {
    // Define a unique callback function name
    const callbackName = "jsonpCallback";

    // Create a Promise to handle JSONP response
    const jsonpPromise = new Promise((resolve, reject) => {
      // Create a script element
      const script = document.createElement("script");

      // Define the JSONP callback function
      window[callbackName] = (data) => {
        resolve(data);
        // Clean up by removing the script element and callback function
        document.body.removeChild(script);
        delete window[callbackName];
      };
      // Construct the JSONP URL with the callback function name
      const queryParams = new URLSearchParams({
        action: "opensearch",
        limit: "10",
        list: "search",
        search: parameters.search,
        origin: "*",
        callback: callbackName, // Specify the callback function
        format: "json",
      });

      // Set the source of the script element to the JSONP URL
      script.src = `https://wikipedia.org/w/api.php?${queryParams.toString()}`;

      // Append the script element to the document body
      document.body.appendChild(script);
    });

    // Wait for the JSONP response and return the extracted data
    const json = await jsonpPromise;
    const data = json[1].map((title, index) => {
      return { title, url: json[3][index] };
    });
    return { data };
  },
  getWilkipediaContent: async (parameters = { title: "" }) => {
    const { title } = parameters;

    // Define a unique callback function name
    const callbackName = "jsonpCallback";

    // Create a Promise to handle JSONP response
    const jsonpPromise = new Promise((resolve, reject) => {
      // Create a script element
      const script = document.createElement("script");

      // Define the JSONP callback function
      window[callbackName] = (data) => {
        resolve(data);
        // Clean up by removing the script element and callback function
        document.body.removeChild(script);
        delete window[callbackName];
      };

      // Construct the JSONP URL with the callback function name
      const queryParams = new URLSearchParams({
        action: "query",
        explaintext: "true",
        format: "json",
        prop: "extracts",
        redirects: "true",
        origin: "*",
        titles: title,
        callback: callbackName, // Specify the callback function
      });

      // Set the source of the script element to the JSONP URL
      script.src = `https://wikipedia.org/w/api.php?${queryParams.toString()}`;

      // Append the script element to the document body
      document.body.appendChild(script);
    });

    // Wait for the JSONP response and return the extracted data
    const json = await jsonpPromise;
    const extract = json.query.pages[Object.keys(json.query.pages)[0]].extract;
    const contentWithoutExtraChars = extract
      .replace(/===/g, "=")
      .replace(/==/g, "=")
      .replace(/\n/g, " ")
      .replace(/\t/g, "");
    return { data: contentWithoutExtraChars };
  },
};
