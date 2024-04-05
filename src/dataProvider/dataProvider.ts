import fakeRestDataProvider from "ra-data-fakerest";
import data from "../data.json";
import { wilkipediaDataProvider } from "./wilkipediaDataProvider";
import { openAIDataProvider } from "./openAIDataProvider";

export const dataProvider = {
  ...fakeRestDataProvider(data, true),
  ...wilkipediaDataProvider,
  ...openAIDataProvider,
};
