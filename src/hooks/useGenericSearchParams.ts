const resetSchemaFailureProperties = (
  data: { [k: string]: any },
  zodError: Zod.ZodError
): { [k: string]: any } => {
  const dataParseErrors = zodError.errors.map((error) => String(error.path));

  let cleanedData = data;

  dataParseErrors.forEach(
    (errorPath) =>
      (cleanedData = {
        ...cleanedData,
        [errorPath]: undefined
      })
  );

  return cleanedData;
};

export const cleanupData = <T extends Zod.ZodRawShape>(
  data: { [k: string]: any },
  schema: Zod.ZodObject<T>
) => {
  const rawDataParseResult = schema.safeParse(data);
  if (rawDataParseResult.success) {
    return rawDataParseResult.data;
  }

  const cleanDataParseResult = schema.safeParse(
    resetSchemaFailureProperties(data, rawDataParseResult.error)
  );

  if (!cleanDataParseResult.success) {
    throw new Error(
      "Default value must be provided for required schema properties"
    );
  }

  return cleanDataParseResult.data;
};
