import { useEffect, useState } from "react";
import {
  Create,
  NumberInput,
  SimpleForm,
  TextInput,
  useDataProvider,
} from "react-admin";
import { useFormContext } from "react-hook-form";
import { WikipediaDialog } from "./components/WikipediaDialog";

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
  const dataProvider = useDataProvider();
  const [wikipediaContent, setWikipediaContent] = useState<any>(null);
  const { setValue, getValues } = useFormContext();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (wikipediaContent) {
      const fetchData = async () => {
        const keys = Object.keys(getValues());
        const { data } = await dataProvider.getOpenAIValuesFromContent(
          wikipediaContent,
          keys
        );
        setData(data);
        for (const key in data) {
          setValue(key, data[key]);
        }
      };
      fetchData();
    }
  }, [wikipediaContent]);
  console.log("ee", data);

  return (
    <>
      <TextInput source="title" />
      <WikipediaDialog setWikipediaContent={setWikipediaContent} />
      <TextInput source="synopsis" multiline fullWidth />
      <TextInput source="type" />
      <TextInput source="genre" />
      <TextInput source="creator" />
      <TextInput source="director" />
      <NumberInput source="nbSeasons" />
    </>
  );
};
