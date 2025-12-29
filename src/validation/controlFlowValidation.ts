/**
 * Control-flow validation for IF / ELSE / ENDIF blocks.
 *
 * Uses a stack to enforce proper nesting and ordering.
 */

import { BuilderBlock, ValidationError } from "../types/builder";

const IF_TYPE = "ampscript.if";
const ELSE_TYPE = "ampscript.else";
const ENDIF_TYPE = "ampscript.endif";

interface IfFrame {
  blockId: string;
  hasElse: boolean;
}

/**
 * Validate IF / ELSE / ENDIF ordering and nesting.
 */
export function validateControlFlow(
  blocks: BuilderBlock<any>[]
): ValidationError[] {
  const errors: ValidationError[] = [];
  const stack: IfFrame[] = [];

  blocks.forEach((block, index) => {
    switch (block.type) {
      case IF_TYPE:
        stack.push({
          blockId: block.id,
          hasElse: false,
        });
        break;

      case ELSE_TYPE: {
        const current = stack[stack.length - 1];

        if (!current) {
          errors.push({
            message: "ELSE without matching IF",
          });
          break;
        }

        if (current.hasElse) {
          errors.push({
            message: "Multiple ELSE blocks for the same IF",
          });
          break;
        }

        current.hasElse = true;
        break;
      }

      case ENDIF_TYPE:
        if (stack.length === 0) {
          errors.push({
            message: "ENDIF without matching IF",
          });
          break;
        }

        stack.pop();
        break;
    }
  });

  // Any IFs left open at the end
  stack.forEach((frame) => {
    errors.push({
      message: "IF block is missing a matching ENDIF",
    });
  });

  return errors;
}