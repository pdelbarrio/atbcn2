import { render, screen, waitFor } from "@testing-library/react";
import Home from "@/app/page";
import { getEvents } from "@/lib/actions/events";

jest.mock("@/lib/actions/events", () => ({
  getEvents: jest.fn(),
}));

const mockEvents = [
  {
    id: 1,
    name: "Concierto de impro",
    date: "2024-04-26 17:00:00+00",
    tags: ["live", "music", "rock"],
    location: "Wolf Stage",
    price: "5€",
    description: "Some band playing live music",
    poster: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
    link: true,
    created: "2017-11-04T18:50:21.651Z",
    created_by: "mail@gmail.com",
  },
  {
    id: 2,
    name: "Concierto de impro",
    date: "2024-04-26 17:00:00+00",
    tags: ["live", "music", "rock"],
    location: "Wolf Stage",
    price: "5€",
    description: "Some band playing live music",
    poster: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
    link: true,
    created: "2017-11-04T18:50:21.651Z",
    created_by: "mail@gmail.com",
  },
  {
    id: 3,
    name: "Concierto de impro",
    date: "2024-04-26 17:00:00+00",
    tags: ["live", "music", "rock"],
    location: "Wolf Stage",
    price: "5€",
    description: "Some band playing live music",
    poster: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
    link: true,
    created: "2017-11-04T18:50:21.651Z",
    created_by: "mail@gmail.com",
  },
];

describe("unit tests of the Home component", () => {
  beforeEach(() => {
    (getEvents as jest.Mock).mockResolvedValue(mockEvents);
  });

  it("renders the Home page with events", async () => {
    render(<Home />);

    // Wait for the events to be fetched
    await waitFor(() => expect(getEvents).toHaveBeenCalledTimes(1));
  });

  it("displays the loading state while fetching events", async () => {
    (getEvents as jest.Mock).mockReturnValue(new Promise(() => {}));
    render(<Home />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  // it("displays an error message when fetching events fails", async () => {
  //   const mockError = new Error("Failed to fetch events");
  //   (getEvents as jest.Mock).mockRejectedValue(mockError);
  //   render(<Home />);
  //   await screen.findByText(`Error: ${mockError.message}`);
  // });

  it("displays an error message when fetching events fails", async () => {
    // Mock the console.error function.
    const consoleSpy = jest.spyOn(console, "error");
    consoleSpy.mockImplementation(() => {});

    const mockError = new Error("Failed to fetch events");
    (getEvents as jest.Mock).mockRejectedValue(mockError);
    render(<Home />);
    await screen.findByText(`Error: ${mockError.message}`);

    // Restore the console.error function.
    consoleSpy.mockRestore();
  });
});
