/**
 * Block registry contract for the AMPscript Email Builder.
 *
 * This file defines how block definitions are stored and accessed.
 * No runtime behavior, lookups, or mutations should exist here.
 */

import { BlockDefinition } from "../types/builder";

/**
 * A map of block definitions keyed by block type.
 *
 * Example:
 * {
 *   "ampscript.lookupRows": BlockDefinition<LookupRowsConfig>
 * }
 */
export type BlockRegistry = {
  [blockType: string]: BlockDefinition<any>;
};

/**
 * The canonical registry object.
 *
 * NOTE:
 * - This should be populated explicitly.
 * - No dynamic registration in v1.
 * - No side effects.
 */
export const blockRegistry: BlockRegistry = {};