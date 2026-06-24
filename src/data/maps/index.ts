import type { KnowledgeMap } from "../../types";
import { aiMap } from "./ai";
import { pmMap } from "./pm";
import { grammarMap } from "./grammar";
import { blackMythMap } from "./black-myth";
import { expressionMap } from "./expression";
import { gameStudioMap } from "./game-studio";
import { programmingLanguagesMap } from "./programming-languages";

export const KNOWLEDGE_MAPS: KnowledgeMap[] = [aiMap, pmMap, grammarMap, blackMythMap, expressionMap, gameStudioMap, programmingLanguagesMap];
