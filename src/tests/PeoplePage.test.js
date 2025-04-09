import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { PersonPage } from "./PersonPage";
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
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);
  });

  const personData = {
    name: "John Doe",
    email: "test@example.com",
    affiliation: "NYU",
    role: "admin",
  };

  const rolesData = {
    admin: "Admin",
    user: "User",
  };

  it("renders loading state initially", () => {
    render(<PersonPage />, { wrapper: BrowserRouter });
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it("renders person data after fetch", async () => {
    axios.get
      .mockResolvedValueOnce({ data: personData }) 
      .mockResolvedValueOnce({ data: rolesData }); 

    render(<PersonPage />, { wrapper: BrowserRouter });

    await waitFor(() => {
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
      expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
      expect(screen.getByText(/NYU/i)).toBeInTheDocument();
    });

    expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("test@example.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("NYU")).toBeInTheDocument();
  });
});
