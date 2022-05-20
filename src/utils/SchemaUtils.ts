import * as z from "zod";
import { util } from "zod/lib/helpers/util";

export const PaginationSearchParamsSchema = z.object({
  page: z.number().gte(1).default(1),
  pageSize: z
    .preprocess(
      (value) => parseInt(value as string, 10),
      z.union([z.literal(5), z.literal(10), z.literal(20)]).transform(Number)
    )
    .default(5)
});

const GetKeyLiteralsForSchema = <T extends Zod.ZodRawShape>(
  schema: z.ZodObject<T>
): [
  z.ZodLiteral<keyof T>,
  z.ZodLiteral<keyof T>,
  ...z.ZodLiteral<keyof T>[]
] => {
  const objectKeyLiterals = Object.keys(schema.shape).map((key) =>
    z.literal(key)
  );

  if (objectKeyLiterals.length < 2) {
    throw Error("Schema must have at least 2 properties");
  }

  return [objectKeyLiterals[0], objectKeyLiterals[1], ...objectKeyLiterals];
};

export const GetSortSearchParams = <T extends Zod.ZodRawShape>(
  schema: z.ZodObject<T>,
  defaultSortBy: keyof T
) => {
  const keyLiterals = GetKeyLiteralsForSchema(schema);
  return z.object({
    sortBy: z
      .union(keyLiterals)
      .default(defaultSortBy as util.noUndefined<keyof T>),
    sortOrder: z.literal("ASC").or(z.literal("DESC")).default("ASC")
  });
};
