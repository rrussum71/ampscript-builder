/**
 * AMPscript compiler contracts.
 *
 * This file defines how blocks are compiled into AMPscript output.
 * No rendering logic, interpolation, or execution should exist here.
 */

import { BuilderBlock, BlockDefinition, ValidationError } from "../types/builder";

/**
 * Result of compiling a single block.
 */
export interface CompiledBlock {
  /**
   * Block instance ID.
   */
  id: string;

  /**
   * Generated AMPscript (no wrapping).
   */
  script: string;
}

/**
 * Result of compiling an entire canvas.
 */
export interface CompileResult {
  /**
   * Final AMPscript output.
   */
  ampscript: string;

  /**
   * Validation errors encountered during compilation.
   */
  errors: ValidationError[];
}

/**
 * Compiler interface.
 *
 * Implementations must be deterministic:
 * same input → same output.
 */
export interface Compiler {
  /**
   * Compile a list of blocks into AMPscript.
   *
   * @param blocks - Blocks in execution order
   * @param registry - Block registry
   */
  compile(
    blocks: BuilderBlock<any>[],
    registry: Record<string, BlockDefinition<any>>
  ): CompileResult;
}