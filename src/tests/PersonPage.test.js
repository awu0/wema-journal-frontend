import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { PersonPage } from "../Components/People/PersonPage.jsx";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useParams: () => ({ email: "test@example.com" }),
}));

jest.mock("axios");

describe("PersonPage", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);
  });

  const personData = {
    name: "Jiahao Lin",
    email: "test@example.com",
    affiliation: "NYU",
    role: "admin",
  };

  const rolesData = {
    admin: "Admin",
    user: "User",
  };

  it("renders loading state initially", () => {
    axios.get.mockResolvedValueOnce({ data: {} });
    axios.get.mockResolvedValueOnce({ data: {} });

    render(<PersonPage />, { wrapper: BrowserRouter });
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it("renders person data after fetch", async () => {
    axios.get
      .mockResolvedValueOnce({ data: personData }) // person
      .mockResolvedValueOnce({ data: rolesData }); // roles

    render(<PersonPage />, { wrapper: BrowserRouter });

    await waitFor(() => {
      expect(screen.getByText("Jiahao Lin")).toBeInTheDocument();
      expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
      expect(screen.getByText(/NYU/i)).toBeInTheDocument();
    });
  });

  it("handles error if person fetch fails", async () => {
    axios.get
      .mockRejectedValueOnce(new Error("Not found")) // person
      .mockResolvedValueOnce({ data: rolesData });   // roles

    render(<PersonPage />, { wrapper: BrowserRouter });

    await waitFor(() => {
      expect(screen.getByText(/There was a problem getting/i)).toBeInTheDocument();
    });
  });

  it("updates the person", async () => {
    axios.get
      .mockResolvedValueOnce({ data: personData })  // person
      .mockResolvedValueOnce({ data: rolesData });  // roles

    axios.patch.mockResolvedValueOnce({});

    render(<PersonPage />, { wrapper: BrowserRouter });

    await waitFor(() => {
      expect(screen.getByText("Jiahao Lin")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/Edit/i));

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "Jane Doe" },
    });

    fireEvent.click(screen.getByText(/Update/i));

    await waitFor(() => {
      expect(axios.patch).toHaveBeenCalledWith(
        expect.stringContaining("/users/test@example.com"),
        expect.objectContaining({
          name: "Jane Doe",
          email: "test@example.com",
          affiliation: "NYU",
          role: "admin",
        })
      );
    });
  });

  it("deletes the person and navigates away", async () => {
    axios.get
      .mockResolvedValueOnce({ data: personData })  // person
      .mockResolvedValueOnce({ data: rolesData });  // roles

    axios.delete.mockResolvedValueOnce({});

    render(<PersonPage />, { wrapper: BrowserRouter });

    await waitFor(() => {
      expect(screen.getByText("Jiahao Lin")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/Edit/i));
    fireEvent.click(screen.getByText("X"));

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(expect.stringContaining("/users/test@example.com"));
      expect(mockNavigate).toHaveBeenCalledWith("/people");
    });
  });
});
