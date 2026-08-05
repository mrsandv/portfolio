import { cache } from "react";
import { STACK_DATA } from "./data/stack";
import type { StackItem } from "./stack";

export const fetchStack = cache(async (): Promise<StackItem[]> => {
  return STACK_DATA;
});
