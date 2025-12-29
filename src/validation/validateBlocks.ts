/**
 * Cross-block validation utilities.
 *
 * These validations run across the entire canvas and
 * catch issues individual blocks cannot detect.
 */

import { BuilderBlock, BlockDefinition, ValidationError } from "../types/builder";

/**
 * Validate duplicate AMPscript variables across blocks.
 *
 * Looks for config properties named:
 * - variable
 * - outputVariable
 */
function validateDuplicateVariables(
  blocks: BuilderBlock<any>[]
): ValidationError[] {
  const errors: ValidationError[] = [];
  const seen = new Map<string, string>(); // variable -> blockId

  blocks.forEach((block) => {
    Object.entries(block.config).forEach(([key, value]) => {
      if (
        (key === "variable" || key === "outputVariable") &&
        typeof value === "string" &&
        value.startsWith("@")
      ) {
        if (seen.has(value)) {
          errors.push({
            field: key,
            message: `Duplicate AMPscript variable detected: ${value}`,
          });
        } else {
          seen.set(value, block.id);
        }
      }
    });
  });

  return errors;
}

/**
 * Validate that all block types exist in the registry.
 */
function validateBlockTypes(
  blocks: BuilderBlock<any>[],
  registry: Record<string, BlockDefinition<any>>
): ValidationError[] {
  return blocks
    .filter((block) => !registry[block.type])
    .map((block) => ({
      message: `Block type "${block.type}" is not registered`,
    }));
}

/**
 * Validate that the canvas is not empty.
 */
function validateNotEmpty(
  blocks: BuilderBlock<any>[]
): ValidationError[] {
  if (blocks.length === 0) {
    return [
      {
        message: "Canvas contains no blocks",
      },
    ];
  }
  return [];
}

/**
 * Run all validation rules against the canvas.
 */
export function validateBlocks(
  blocks: BuilderBlock<any>[],
  registry: Record<string, BlockDefinition<any>>
): ValidationError[] {
  return [
    ...validateNotEmpty(blocks),
    ...validateBlockTypes(blocks, registry),
    ...validateDuplicateVariables(blocks),
  ];
}