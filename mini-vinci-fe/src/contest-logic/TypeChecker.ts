
import { Canvas } from './Canvas';

export type CheckResult = { result: true } | { result: false, error: string };

export class TypeChecker {
  static typeCheckColorInstruction(blocks: Map<string, Canvas>, block: string): CheckResult {
			if (!blocks.has(block)) {
					return { result: false, error: `Invalid Block Id ${block}!` };  
			} 
			return { result: true };
		}
		static typeCheckCutInstruction(block: string, location: number) {

		}
		static typeCheckSwapInstruction() {

		}
		static typeCheckMergeInstruction() {

		}
}

export default TypeChecker;