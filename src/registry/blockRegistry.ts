/**
 * Block registry contract for the AMPscript Email Builder.
 *
 * This file defines how block definitions are stored and accessed.
 * No runtime behavior, lookups, or mutations should exist here.
 */

import { BlockDefinition } from "../types/builder";
import { setBlock } from "../blocks/setBlock";
import { lookupRowsBlock } from "../blocks/lookupRowsBlock";
import { rowCountBlock } from "../blocks/rowCountBlock";
import { rowBlock } from "../blocks/rowBlock";
import { fieldBlock } from "../blocks/fieldBlock";

export type BlockRegistry = {
  [blockType: string]: BlockDefinition<any>;
};

export const blockRegistry: BlockRegistry = {
  [setBlock.type]: setBlock,
  [lookupRowsBlock.type]: lookupRowsBlock,
  [rowCountBlock.type]: rowCountBlock,
  [rowBlock.type]: rowBlock,
  [fieldBlock.type]: fieldBlock,
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