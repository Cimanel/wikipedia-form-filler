import { useEffect, useState } from "react";
import {
  ArrayInput,
  Create,
  DateInput,
  NumberInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
} from "react-admin";
import { useFormContext } from "react-hook-form";
import { WilkipediaDialog } from "./components/WilkipediaDialog";

export const SeriesCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <SeriesForm />
      </SimpleForm>
    </Create>
  );
};

const SeriesForm = () => {
  const [wilkipediaContent, setWilkipediaContent] = useState<any>(null);
  const { setValue, getValues } = useFormContext();

  useEffect(() => {
    if (wilkipediaContent) {
      const keys = Object.keys(getValues());
      console.log("keys", keys);
      const values = getOpenAIValuesFromContent(wilkipediaContent, keys);
    }
  }, [wilkipediaContent]);

  return (
    <>
      <TextInput source="title" />
      <WilkipediaDialog setWilkipediaContent={setWilkipediaContent} />
      <TextInput source="description" />
      <TextInput source="type" />
      <TextInput source="genre" />
      <TextInput source="creator" />
      <TextInput source="director" />
      <ArrayInput source="seasons">
        <SimpleFormIterator>
          <NumberInput source="season" />
          <NumberInput source="episodes" />
          <DateInput source="release" />
        </SimpleFormIterator>
      </ArrayInput>
    </>
  );
};
