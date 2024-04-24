import { useEffect } from "react";
import {
  Create,
  NumberInput,
  SimpleForm,
  TextInput,
  useDataProvider,
} from "react-admin";
import { useFormContext } from "react-hook-form";
import { WikipediaInterractions } from "./components/WikipediaInterractions";
import {
  CONTENT_STATUS,
  useWikipediaContext,
  WikipediaContext,
} from "./components/WikipediaContext";

export const SeriesCreate = () => {
  return (
    <WikipediaContext>
      <Create aside={<WikipediaInterractions />}>
        <SimpleForm>
          <SeriesForm />
        </SimpleForm>
      </Create>
    </WikipediaContext>
  );
};

const SeriesForm = () => {
  const dataProvider = useDataProvider();
  const { wikipediaContent, setStatus, setTitle } = useWikipediaContext();
  const { setValue, getValues } = useFormContext();

  useEffect(() => {
    if (wikipediaContent) {
      const fetchData = async () => {
        const keys = Object.keys(getValues());
        const { data } = await dataProvider.getOpenAIValuesFromContent(
          wikipediaContent,
          keys
        );
        for (const key in data) {
          setValue(key, data[key]);
        }
        setStatus(CONTENT_STATUS);
      };
      fetchData();
    }
  }, [wikipediaContent]);

  return (
    <>
      <TextInput source="title" onChange={(e) => setTitle(e.target.value)} />
      <TextInput source="synopsis" multiline fullWidth />
      <TextInput source="type" />
      <TextInput source="genre" />
      <TextInput source="creator" />
      <TextInput source="director" />
      <NumberInput source="nbSeasons" />
    </>
  );
};
