import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Spinner from "@/components/Spinner";
import { ClipLoader } from "react-spinners";

type ClipLoaderProps = React.ComponentProps<typeof ClipLoader>;

jest.mock("react-spinners", () => ({
  ClipLoader: (props: ClipLoaderProps) => (
    <div data-testid="MockSpinner" aria-label={props["aria-label"]} />
  ),
}));

describe("Spinner", () => {
  it("renders the spinner when loading is true", () => {
    render(<Spinner loading={true} />);
    expect(screen.getByLabelText("Loading Spinner")).toBeInTheDocument();
  });

  it("still renders when loading is false", () => {
    render(<Spinner loading={false} />);
    expect(screen.getByLabelText("Loading Spinner")).toBeInTheDocument();
  });
});
