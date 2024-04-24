import fakeRestDataProvider from "ra-data-fakerest";
import data from "../data.json";
import { wikipediaDataProvider } from "./wikipediaDataProvider";
import { openAIDataProvider } from "./openAIDataProvider";

export const dataProvider = {
  ...fakeRestDataProvider(data, true),
  ...wikipediaDataProvider,
  ...openAIDataProvider,
};
