import { advanceTo, clear } from "jest-date-mock";
import { render, screen, fireEvent } from "@testing-library/react";
import EventList from "../EventList";

describe("unit tests of the EventList component", () => {
  beforeEach(() => {
    // Set the date to a specific date before each test.
    advanceTo(new Date(2024, 1, 1));
  });

  afterEach(() => {
    // Clear the mocked date after each test.
    clear();
  });

  test("renders only events for the current week", () => {
    // Arrange: 3 events from this simulated current week and 1 from other month.
    const events = [
      { id: "1", date: "2024-02-01T00:00:00.000Z" },
      { id: "2", date: "2024-02-01T00:00:00.000Z" },
      { id: "3", date: "2024-02-01T00:00:00.000Z" },
      { id: "4", date: "2024-03-01T00:00:00.000Z" },
    ];
    // Act: Render the component with the events.
    render(<EventList events={events} />);

    // Assert: Check that only the events for the current week are rendered.
    const eventRows = screen.getAllByTestId("event-row");
    expect(eventRows).toHaveLength(3);
  });

  test("navigates to the next and previous weeks", () => {
    // Arrange
    const events = [
      { id: "1", date: "2024-01-28T00:00:00.000Z" }, // An event from the last week of January 2024
      { id: "2", date: "2024-02-01T00:00:00.000Z" }, // An event from the first week of February 2024
      { id: "3", date: "2024-02-08T00:00:00.000Z" }, // An event from the second week of February 2024
    ];

    render(<EventList events={events} />);

    // Assert: Check that only the events for the first week are initially rendered.
    let eventRows = screen.getAllByTestId("event-row");
    expect(eventRows).toHaveLength(1); // Adjust this number based on the number of events for the first week.

    // Act: Click the next week button.
    const nextWeekButton = screen.getByTestId("next-week-button");
    fireEvent.click(nextWeekButton);

    // Assert: Check that only the events for the second week are now rendered.
    eventRows = screen.getAllByTestId("event-row");
    expect(eventRows).toHaveLength(1); // Adjust this number based on the number of events for the second week.

    // Act: Click the previous week button.
    const previousWeekButton = screen.getByTestId("previous-week-button");
    fireEvent.click(previousWeekButton);

    // Assert: Check that only the events for the first week are now rendered again.
    eventRows = screen.getAllByTestId("event-row");
    expect(eventRows).toHaveLength(1); // Adjust this number based on the number of events for the first week.
  });

  test("renders events for the current week or a message if there are no events", () => {
    // Arrange: set of events for the current week.
    const events = [
      { id: "1", date: "2024-02-01T00:00:00.000Z" },
      { id: "2", date: "2024-02-01T00:00:00.000Z" },
      { id: "3", date: "2024-02-01T00:00:00.000Z" },
    ];

    // Act: Render the component with the events.
    render(<EventList events={events} />);

    // Assert: Check that the correct number of EventRow components are rendered.
    const eventRows = screen.getAllByTestId("event-row");
    expect(eventRows).toHaveLength(events.length);

    // Arrange: Empty set of events.
    const noEvents: never[] = [];

    // Act: Render the component with no events.
    render(<EventList events={noEvents} />);

    // Assert: Check that the correct message is rendered.
    const message = screen.getByText(
      "No hi ha esdeveniments introduïts per a aquesta setmana"
    );
    expect(message).toBeInTheDocument();
  });
});
