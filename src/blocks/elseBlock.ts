/**
 * ELSE block definition.
 *
 * Example output:
 * ELSE
 */

import { BlockDefinition } from "../types/builder";

export interface ElseBlockConfig {}

export const elseBlock: BlockDefinition<ElseBlockConfig> = {
  type: "ampscript.else",
  label: "ELSE",
  category: "Logic",

  template: `ELSE`,

  settings: {},

  validate: () => [],
};