import { render, screen } from "@testing-library/react";
import LoadingPage from "../../app/loading";

describe("LoadingPage", () => {
  test("renders the spinner when loading=true", () => {
    render(<LoadingPage loading={true} />);
    const spinner = screen.getByLabelText("Loading Spinner");
    expect(spinner).toBeInTheDocument();
  });

  test("does not render a spinner when loading=false", () => {
    render(<LoadingPage loading={false} />);
    const spinner = screen.queryByLabelText("Loading Spinner");
    expect(spinner).toBeNull();
  });
});
