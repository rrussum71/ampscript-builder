/**
 * ENDIF block definition.
 *
 * Example output:
 * ENDIF
 */

import { BlockDefinition } from "../types/builder";

export interface EndIfBlockConfig {}

export const endIfBlock: BlockDefinition<EndIfBlockConfig> = {
  type: "ampscript.endif",
  label: "ENDIF",
  category: "Logic",

  template: `ENDIF`,

  settings: {},

  validate: () => [],
};