import type { KnowledgeMap } from "../../types";
import { aiMap } from "./ai";
import { pmMap } from "./pm";
import { grammarMap } from "./grammar";
import { blackMythMap } from "./black-myth";
import { expressionMap } from "./expression";
import { gameStudioMap } from "./game-studio";
import { programmingLanguagesMap } from "./programming-languages";
import { humanoidRobotMap } from "./humanoid-robot";

export const KNOWLEDGE_MAPS: KnowledgeMap[] = [humanoidRobotMap, aiMap, pmMap, grammarMap, blackMythMap, expressionMap, gameStudioMap, programmingLanguagesMap];
