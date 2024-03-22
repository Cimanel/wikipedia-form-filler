import {
  ArrayField,
  ChipField,
  Datagrid,
  List,
  SingleFieldList,
  TextField,
} from "react-admin";

export const SeriesList = () => (
  <List hasCreate={true}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="description" />
      <TextField source="type" />
      <TextField source="genre" />
      <TextField source="creator" />
      <TextField source="director" />
      <ArrayField source="seasons">
        <SingleFieldList>
          <ChipField source="season" />
        </SingleFieldList>
      </ArrayField>
    </Datagrid>
  </List>
);
