import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { PersonSchema } from "../models/Person";
import {
  PaginationSearchParamsSchema,
  GetSortSearchParams
} from "../utils/SchemaUtils";
import { getObjectFromSearchParams } from "../utils/SearchParamUtils";
import { cleanupData } from "./useGenericSearchParams";

const personTableSearchParams = PersonSchema.merge(
  PaginationSearchParamsSchema.merge(
    GetSortSearchParams(PersonSchema, "firstName")
  )
);

export const usePersonTableSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const cleanedupSearchParams = useMemo(
    () =>
      cleanupData(
        getObjectFromSearchParams(searchParams),
        personTableSearchParams
      ),
    [searchParams]
  );

  useEffect(() => {
    console.log("useEffect");
    setSearchParams(cleanedupSearchParams);
  }, [cleanedupSearchParams, setSearchParams]);

  return [cleanedupSearchParams];
};
