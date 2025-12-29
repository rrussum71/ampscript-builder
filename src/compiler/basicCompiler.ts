/**
 * Basic AMPscript compiler implementation with formatting.
 */

import {
  BuilderBlock,
  BlockDefinition,
  ValidationError,
} from "../types/builder";
import { Compiler, CompileResult } from "./compiler";

/**
 * Simple token interpolation.
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
 * Determine indentation behavior based on AMPscript line.
 */
function getIndentDelta(line: string): {
  before: number;
  after: number;
} {
  const trimmed = line.trim().toUpperCase();

  if (trimmed.startsWith("IF ")) {
    return { before: 0, after: 1 };
  }

  if (trimmed === "ELSE") {
    return { before: -1, after: 1 };
  }

  if (trimmed === "ENDIF") {
    return { before: -1, after: 0 };
  }

  return { before: 0, after: 0 };
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
    const formattedLines: string[] = [];
    let indentLevel = 0;

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

      const rawLine = interpolateTemplate(
        definition.template,
        block.config
      );

      const { before, after } = getIndentDelta(rawLine);

      indentLevel = Math.max(0, indentLevel + before);

      const indent = "  ".repeat(indentLevel);
      formattedLines.push(`${indent}${rawLine}`);

      indentLevel += after;
    });

    const ampscript =
      errors.length > 0
        ? ""
        : `%%[\n${formattedLines.join("\n")}\n]%%`;

    return {
      ampscript,
      errors,
    };
  }
}