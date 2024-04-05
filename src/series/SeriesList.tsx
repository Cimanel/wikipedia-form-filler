import { Datagrid, List, NumberField, TextField } from "react-admin";

export const SeriesList = () => (
  <List hasCreate={true}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="synopsis" />
      <TextField source="type" />
      <TextField source="genre" />
      <TextField source="creator" />
      <TextField source="director" />
      <NumberField source="nbSeasons" />
    </Datagrid>
  </List>
);
