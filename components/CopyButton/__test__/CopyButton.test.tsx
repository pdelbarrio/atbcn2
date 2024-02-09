import { fireEvent, screen, render, waitFor } from "@testing-library/react";
import CopyButton from "../CopyButton";

describe("unit tests of the CopyButton component", () => {
  beforeAll(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("copies the event info when clicked", async () => {
    const event = {
      id: "1",
      date: "2024-01-02T00:00:00.000Z",
      name: "Test Event",
      location: "Test Location",
      price: "Free",
      tags: ["Test tag 1", "Test tag 2"],
      description: "Test Description",
      link: "http://fakelinkofevent.com",
      poster: "http://fakelinkoftheposter.jpg",
      validated: true,
      completed: false,
      created_by: "mailofthecreator@gmail.com",
      created_at: "2024-01-02T00:00:00.000Z",
    };

    const { getByText } = render(<CopyButton event={event} />);
    const copyButton = screen.getByTestId("copy-button");

    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        expect.stringContaining("Test Event")
      );
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        expect.stringContaining("Test Description")
      );
      // Add more assertions for other event properties as needed
    });
  });
});
