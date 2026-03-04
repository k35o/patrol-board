import { describe, expect, it } from "vitest";
import { detectRuntime } from "./run-script.js";

describe("detectRuntime", () => {
  it("returns 'node' for .ts files", () => {
    expect(detectRuntime("script.ts")).toBe("node");
  });

  it("returns 'node' for .js files", () => {
    expect(detectRuntime("script.js")).toBe("node");
  });

  it("returns 'shell' for .sh files", () => {
    expect(detectRuntime("script.sh")).toBe("shell");
  });

  it("throws for unsupported extensions", () => {
    expect(() => detectRuntime("script.py")).toThrow(
      "Unsupported script extension: .py",
    );
  });

  it("handles paths with directories", () => {
    expect(detectRuntime("./scripts/report.ts")).toBe("node");
    expect(detectRuntime("/absolute/path/run.sh")).toBe("shell");
  });
});
