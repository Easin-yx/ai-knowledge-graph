import type { KnowledgeMap } from "../../types";
import { aiMap } from "./ai";
import { pmMap } from "./pm";
import { grammarMap } from "./grammar";
import { blackMythMap } from "./black-myth";

export const KNOWLEDGE_MAPS: KnowledgeMap[] = [aiMap, pmMap, grammarMap, blackMythMap];
