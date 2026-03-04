import * as exec from "@actions/exec";
import * as path from "node:path";

type Runtime = "node" | "shell";

export function detectRuntime(scriptPath: string): Runtime {
  const ext = path.extname(scriptPath).toLowerCase();
  switch (ext) {
    case ".ts":
    case ".js":
      return "node";
    case ".sh":
      return "shell";
    default:
      throw new Error(`Unsupported script extension: ${ext}`);
  }
}

export async function runScript(scriptPath: string): Promise<string> {
  const runtime = detectRuntime(scriptPath);
  let stdout = "";

  const options: exec.ExecOptions = {
    listeners: {
      stdout: (data: Buffer) => {
        stdout += data.toString();
      },
    },
  };

  switch (runtime) {
    case "node":
      await exec.exec("npx", ["tsx", scriptPath], options);
      break;
    case "shell":
      await exec.exec("bash", [scriptPath], options);
      break;
  }

  return stdout;
}
