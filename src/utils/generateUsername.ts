import { randomUUID } from "crypto";
import slugify from "slugify";

export const generateUserName = (name: string) => {
  return slugify(name) + randomUUID();
};
