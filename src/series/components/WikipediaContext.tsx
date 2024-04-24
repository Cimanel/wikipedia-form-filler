import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

export const SEARCH_STATUS = "search";
export const LIST_STATUS = "list";
export const LOADING_STATUS = "loading";
export const CONTENT_STATUS = "content";
export const DISCARD_STATUS = "discard";

export const WikipediaContext = ({ children }: WikipediaContextProps) => {
  const [wikipediaList, setWikipediaList] = useState<
    Array<{ title: string; url: string }>
  >([]);
  const [wikipediaContent, setWikipediaContent] = useState<string>("");
  const [status, setStatus] = useState<string>("search");
  const [title, setTitle] = useState<string>("");
  const [backup, setBackup] = useState<Record<string, string | undefined>>({});
  const [wikiTitle, setWikiTitle] = useState<string | null>(null);

  return (
    <Wikipedia.Provider
      value={{
        wikipediaContent,
        setWikipediaContent,
        wikipediaList,
        setWikipediaList,
        status,
        setStatus,
        title,
        setTitle,
        backup,
        setBackup,
        wikiTitle,
        setWikiTitle,
      }}
    >
      {children}
    </Wikipedia.Provider>
  );
};

export const useWikipediaContext = (): WikipediaData => {
  const context = useContext(Wikipedia);
  if (!context) {
    throw new Error(
      "useWikipediaContext must be used within a WikipediaContext"
    );
  }
  return context;
};

type WikipediaContextProps = {
  children: ReactNode;
};

type WikipediaData = {
  wikipediaContent: string;
  setWikipediaContent: Dispatch<SetStateAction<string>>;
  wikipediaList: Array<{ title: string; url: string }>;
  setWikipediaList: Dispatch<
    SetStateAction<Array<{ title: string; url: string }>>
  >;
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  backup: Record<string, string | undefined>;
  setBackup: Dispatch<SetStateAction<Record<string, string | undefined>>>;
  wikiTitle: string | null;
  setWikiTitle: Dispatch<SetStateAction<string | null>>;
};

const Wikipedia = createContext<WikipediaData | null>(null);
