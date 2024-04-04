import fakeRestDataProvider from "ra-data-fakerest";
import data from "../data.json";
import { wilkipediaDataProvider } from "./wilkipediaDataProvider";

export const dataProvider = {
  ...fakeRestDataProvider(data, true),
  ...wilkipediaDataProvider,
};
