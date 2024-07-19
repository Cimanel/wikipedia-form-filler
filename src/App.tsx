import { Admin, Resource, defaultTheme } from "react-admin";
import { dataProvider } from "./dataProvider/dataProvider";
import series from "./series";
const theme = {
  ...defaultTheme,
  components: {
    RaSidebar: {
      styleOverrides: {
        root: {
          width: "150px",
        },
      },
    },
  },
};

export const App = () => (
  <Admin dataProvider={dataProvider} theme={theme}>
    <Resource name="series" {...series} />
  </Admin>
);
