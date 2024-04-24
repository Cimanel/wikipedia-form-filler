import { useEffect, useState } from "react";
import {
  Create,
  NumberInput,
  SimpleForm,
  TextInput,
  useDataProvider,
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
  const dataProvider = useDataProvider();
  const [wilkipediaContent, setWilkipediaContent] = useState<any>(null);
  const { setValue, getValues } = useFormContext();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (wilkipediaContent) {
      const fetchData = async () => {
        const keys = Object.keys(getValues());
        const { data } = await dataProvider.getOpenAIValuesFromContent(
          wilkipediaContent,
          keys
        );
        setData(data);
        for (const key in data) {
          setValue(key, data[key]);
        }
      };
      fetchData();
    }
  }, [wilkipediaContent]);
  console.log("ee", data);

  return (
    <>
      <TextInput source="title" />
      <WilkipediaDialog setWilkipediaContent={setWilkipediaContent} />
      <TextInput source="synopsis" multiline fullWidth />
      <TextInput source="type" />
      <TextInput source="genre" />
      <TextInput source="creator" />
      <TextInput source="director" />
      <NumberInput source="nbSeasons" />
    </>
  );
};
