type Runtime = "node" | "shell";
export declare function detectRuntime(scriptPath: string): Runtime;
export declare function runScript(scriptPath: string): Promise<string>;
export {};
