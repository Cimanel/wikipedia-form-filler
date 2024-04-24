import { useEffect } from "react";
import {
  Create,
  NumberInput,
  SimpleForm,
  TextInput,
  useDataProvider,
} from "react-admin";
import { useFormContext } from "react-hook-form";
import {
  CONTENT_STATUS,
  DISCARD_STATUS,
  LIST_STATUS,
  useWikipediaContext,
  WikipediaContext,
} from "./components/WikipediaContext";
import { WikipediaAside } from "./components/WikipediaAside";

export const SeriesCreate = () => {
  return (
    <WikipediaContext>
      <Create aside={<WikipediaAside />}>
        <SimpleForm>
          <SeriesForm />
        </SimpleForm>
      </Create>
    </WikipediaContext>
  );
};

const SeriesForm = () => {
  const dataProvider = useDataProvider();
  const {
    backup,
    wikipediaContent,
    setWikipediaContent,
    setBackup,
    setStatus,
    setTitle,
    status,
  } = useWikipediaContext();
  const { setValue, getValues } = useFormContext();

  useEffect(() => {
    if (wikipediaContent) {
      const fetchData = async () => {
        const formValues = getValues();
        const keys = Object.keys(formValues);
        const { data } = await dataProvider.getOpenAIValuesFromContent(
          wikipediaContent,
          keys
        );
        setBackup(formValues);
        for (const key in data) {
          setValue(key, data[key]);
        }
        setStatus(CONTENT_STATUS);
      };
      fetchData();
    }
  }, [wikipediaContent]);

  useEffect(() => {
    if (status === DISCARD_STATUS) {
      const resetData = async () => {
        const keys = Object.keys(backup);
        for (const key of keys) {
          setValue(key, backup[key]);
        }
        setBackup({});
        setWikipediaContent("");
        setStatus(LIST_STATUS);
      };
      resetData();
    }
  }, [status]);

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
