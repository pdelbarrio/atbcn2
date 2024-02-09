import React from "react";
import { render, screen } from "@testing-library/react";
import dotenv from "dotenv";

import { GlobalContextProvider } from "@/context/events.context";
import PreviewModal from "../PreviewModal";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}));

dotenv.config({ path: ".env.local" });

describe("Integrationn tests for PreviewModal component", () => {
  it("renders event details correctly", async () => {});
});
