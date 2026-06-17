import type { KnowledgeMap } from "../../types";
import { aiMap } from "./ai";
import { pmMap } from "./pm";
import { grammarMap } from "./grammar";
import { blackMythMap } from "./black-myth";
import { expressionMap } from "./expression";

export const KNOWLEDGE_MAPS: KnowledgeMap[] = [aiMap, pmMap, grammarMap, blackMythMap, expressionMap];
