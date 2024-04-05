import { Edit, NumberField, SimpleForm, TextInput } from "react-admin";

export const SeriesEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="title" />
      <TextInput source="synopsis" />
      <TextInput source="type" />
      <TextInput source="genre" />
      <TextInput source="creator" />
      <TextInput source="director" />
      <NumberField source="nbSeasons" />
    </SimpleForm>
  </Edit>
);
