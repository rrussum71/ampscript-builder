/**
 * Basic AMPscript compiler implementation.
 *
 * Responsibilities:
 * - Validate blocks
 * - Interpolate templates
 * - Preserve execution order
 * - Produce deterministic AMPscript output
 */

import {
  BuilderBlock,
  BlockDefinition,
  ValidationError,
} from "../types/builder";
import { Compiler, CompileResult } from "./compiler";

/**
 * Simple token interpolation.
 * Replaces {{token}} with values from config.
 */
function interpolateTemplate(
  template: string,
  config: Record<string, any>
): string {
  return template.replace(/{{\s*(\w+)\s*}}/g, (_, key) => {
    const value = config[key];
    return value !== undefined ? String(value) : "";
  });
}

/**
 * Basic compiler implementation.
 */
export class BasicCompiler implements Compiler {
  compile(
    blocks: BuilderBlock<any>[],
    registry: Record<string, BlockDefinition<any>>
  ): CompileResult {
    const errors: ValidationError[] = [];
    const compiledLines: string[] = [];

    blocks.forEach((block) => {
      const definition = registry[block.type];

      if (!definition) {
        errors.push({
          message: `Unknown block type: ${block.type}`,
        });
        return;
      }

      // Block-level validation
      if (definition.validate) {
        const validationErrors = definition.validate(block.config);
        if (validationErrors.length > 0) {
          errors.push(...validationErrors);
          return;
        }
      }

      const line = interpolateTemplate(
        definition.template,
        block.config
      );

      compiledLines.push(line);
    });

    const ampscript =
      errors.length > 0
        ? ""
        : `%%[\n${compiledLines.join("\n")}\n]%%`;

    return {
      ampscript,
      errors,
    };
  }
}