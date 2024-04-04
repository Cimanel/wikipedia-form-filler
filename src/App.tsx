import { Admin, Resource } from "react-admin";
import { dataProvider } from "./dataProvider/dataProvider";
import series from "./series";

export const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="series" {...series} />
  </Admin>
);
