import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import EventRow from "../EventRow";
import { formattedDate } from "@/lib/utils";

let errorSpy: jest.SpyInstance<
  void,
  [message?: any, ...optionalParams: any[]],
  any
>;

beforeAll(() => {
  errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  errorSpy.mockRestore();
});

describe("unit tests of the EventRow component", () => {
  test("renders event initial information", () => {
    //Arrange: create an event

    const event = {
      id: "1",
      date: "2024-01-02T00:00:00.000Z",
      name: "Test Event",
      location: "Test Location",
      price: "Free",
      tags: ["Test tag 1", "Test tag 2"],
      description: "Event description",
      link: "http://fakelinkofevent.com",
      poster: "http://fakelinkoftheposter.jpg",
      validated: true,
      completed: false,
      created_by: "mailofthecreator@gmail.com",
      created_at: "2024-01-02T00:00:00.000Z",
    };
    // Calculate the formatted date string.
    const formattedDateStr = formattedDate(
      event.date,
      "eee, dd/MM/yyyy HH:mm'h'"
    );
    //Act: Render the component with the event
    render(<EventRow event={event} />);

    //Assert: check that the event information is rendered
    expect(screen.getByText(event.name)).toBeInTheDocument();
    expect(screen.getByText(event.location)).toBeInTheDocument();
    expect(screen.getByText(formattedDateStr)).toBeInTheDocument();
    expect(screen.getByText(event.price)).toBeInTheDocument();
    event.tags.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  test("triggers the Dialog and renders full event information", () => {
    const event = {
      id: "1",
      date: "2024-01-02T00:00:00.000Z",
      name: "Test Event",
      location: "Test Location",
      price: "Free",
      tags: ["Test tag 1", "Test tag 2"],
      description: "Event description",
      link: "http://fakelinkofevent.com",
      poster: "http://fakelinkoftheposter.jpg",
      validated: true,
      completed: false,
      created_by: "mailofthecreator@gmail.com",
      created_at: "2024-01-02T00:00:00.000Z",
    };

    // Calculate the formatted date string.
    const formattedDateStr = formattedDate(
      event.date,
      "eee, dd/MM/yyyy HH:mm'h'"
    );

    //Act: Render the component with the event
    render(<EventRow event={event} />);

    const eventRow = screen.getByTestId("event-row");
    fireEvent.click(eventRow);

    // Assert: Check that the Dialog is opened and the full event information is rendered.
    const dialog = screen.getByTestId("event-dialog");
    expect(within(dialog).getByText(event.name)).toBeInTheDocument();
    expect(within(dialog).getByText(event.location)).toBeInTheDocument();
    expect(within(dialog).getByText(event.price)).toBeInTheDocument();
    expect(within(dialog).getByText(event.description)).toBeInTheDocument();
    event.tags.forEach((tag) => {
      expect(within(dialog).getByText(tag)).toBeInTheDocument();
    });

    expect(within(dialog).getByText(formattedDateStr)).toBeInTheDocument();
    expect(within(dialog).getByAltText(event.name)).toBeInTheDocument(); //this test the alt property of the poster
    const linkElement = within(dialog).getByText("Link");
    expect(linkElement).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-node-access
    expect(linkElement.closest("a")).toHaveAttribute("href", event.link);
  });
});
