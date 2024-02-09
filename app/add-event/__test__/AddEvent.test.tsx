import { render, screen, fireEvent } from "@testing-library/react";
import dotenv from "dotenv";
import AddEvent from "../page";

dotenv.config({ path: ".env.local" });

// Mock the useGlobalContext hook
jest.mock("../../../context/events.context.tsx", () => ({
  ...jest.requireActual("../../../context/events.context.tsx"),
  useGlobalContext: () => ({
    previewEvent: null,
    setPreviewEvent: jest.fn(),
    showModal: false,
    setShowModal: jest.fn(),
    uploadedPoster: null,
    setUploadedPoster: jest.fn(),
    tags: [],
    setTags: jest.fn(),
    supabase: {
      from: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          data: [],
          error: null,
        }),
      }),
      auth: {
        getSession: jest.fn().mockReturnValue({
          data: {
            session: {
              user: {
                email: "test@example.com",
              },
            },
          },
          error: null,
        }),
      },
    },
    createdBy: null,
    setCreatedBy: jest.fn(),
  }),
}));

describe("AddEvent component integration tests", () => {
  test("validates form fields correctly", async () => {
    render(<AddEvent />);

    // Find form fields
    const nameInput = screen.getByPlaceholderText("nom");
    const descriptionInput = screen.getByPlaceholderText("descripció");
    const locationInput = screen.getByPlaceholderText("ubicació");
    const priceInput = screen.getByPlaceholderText("preu");
    const linkInput = screen.getByPlaceholderText("link");

    // Set invalid values for form fields
    fireEvent.change(nameInput, { target: { value: "" } });
    fireEvent.change(descriptionInput, { target: { value: "a".repeat(160) } });
    fireEvent.change(locationInput, { target: { value: "" } });
    fireEvent.change(priceInput, { target: { value: "a".repeat(31) } });
    fireEvent.change(linkInput, { target: { value: "a".repeat(201) } });

    // Trigger form submission
    fireEvent.click(screen.getByText("Preview"));

    // Assert validation errors
    expect(
      await screen.findByText("El nom de l'esdeveniment és obligatori")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("La descripció no pot tenir més de 150 caràcters")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("La ubicació és obligatòria")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("El preu no pot tenir més de 30 caràcters")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("L'enllaç no pot tenir més de 200 caràcters")
    ).toBeInTheDocument();
  });
});
