import { fireEvent, render, screen, waitFor, within } from "@/lib/test-utils";
import Page from "@/app/users/page";
import userEvent from "@testing-library/user-event";
import {
  createUser,
  deleteUser,
  updateUser,
  listUsers,
} from "@/services/users";

jest.mock("@/services/users", () => ({
  listUsers: jest.fn(),
  createUser: jest.fn(),
  deleteUser: jest.fn(),
  updateUser: jest.fn(),
}));

const mockListUsers = jest.mocked(listUsers);
const mockCreateUser = jest.mocked(createUser);
const mockDeleteUser = jest.mocked(deleteUser);
const mockEditUser = jest.mocked(updateUser);

describe("Users Page", () => {
  it("renders users page", async () => {
    mockListUsers.mockResolvedValueOnce({
      success: true,
      data: [],
      totalCount: 0,
    });

    render(<Page />);

    const heading = await screen.findByRole("heading", { name: "Users" });
    expect(heading).toBeInTheDocument();

    const paginationText = await screen.findByText(/Rows per page/i);
    expect(paginationText).toBeInTheDocument();
  });

  it("renders users chart", async () => {
    mockListUsers.mockResolvedValueOnce({
      success: true,
      data: [],
      totalCount: 0,
    });

    render(<Page />);

    const usersChart = await screen.findByText("Total Users");
    expect(usersChart).toBeInTheDocument();
  });

  it("Shows modal to add user when button is clicked", async () => {
    mockListUsers.mockResolvedValueOnce({
      success: true,
      data: [],
      totalCount: 0,
    });

    render(<Page />);

    const firstAddUserButton = screen.getAllByRole("button", {
      name: /Add User/i,
    })[0];

    expect(firstAddUserButton).toBeInTheDocument();

    fireEvent.click(firstAddUserButton);

    const modalText = await screen.findByText(/Add a new user/i);
    expect(modalText).toBeInTheDocument();
  });

  it("Should show error message when form is submitted with invalid data", async () => {
    mockListUsers.mockResolvedValueOnce({
      success: true,
      data: [],
      totalCount: 0,
    });

    render(<Page />);

    const firstAddUserButton = screen.getAllByRole("button", {
      name: /Add User/i,
    })[0];

    fireEvent.click(firstAddUserButton);

    const modalText = await screen.findByText(/Add a new user/i);
    expect(modalText).toBeInTheDocument();

    const nameInput = screen.getByPlaceholderText(/Enter name/i);
    expect(nameInput).toBeInTheDocument();
    fireEvent.change(nameInput, { target: { value: "John Doe" } });

    const emailInput = screen.getByPlaceholderText(/Enter email/i);
    expect(emailInput).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: "john@exampl" } });

    const phoneInput = screen.getByPlaceholderText(/Enter phone/i);
    expect(phoneInput).toBeInTheDocument();
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });

    const submitButton = screen.getByRole("button", { name: /Save/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Invalid email")).toBeInTheDocument();
    });
  });

  it("Should add a new user when form is successfully submitted", async () => {
    mockListUsers.mockResolvedValueOnce({
      success: true,
      data: [],
      totalCount: 0,
    });
    mockCreateUser.mockResolvedValueOnce({
      success: true,
      data: {
        id: 1,
        name: "John Doe",
        username: "johndoe",
        email: "john@example.com",
        phone: "1234567890",
        website: "https://example.com",
      },
    });

    render(<Page />);

    const firstAddUserButton = screen.getAllByRole("button", {
      name: /Add User/i,
    })[0];

    fireEvent.click(firstAddUserButton);

    const modalText = await screen.findByText(/Add a new user/i);
    expect(modalText).toBeInTheDocument();

    const nameInput = screen.getByPlaceholderText(/Enter name/i);
    expect(nameInput).toBeInTheDocument();
    fireEvent.change(nameInput, { target: { value: "John Doe" } });

    const emailInput = screen.getByPlaceholderText(/Enter email/i);
    expect(emailInput).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });

    const phoneInput = screen.getByPlaceholderText(/Enter phone/i);
    expect(phoneInput).toBeInTheDocument();
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });

    const usernameInput = screen.getByPlaceholderText(/Enter username/i);
    expect(usernameInput).toBeInTheDocument();
    fireEvent.change(usernameInput, { target: { value: "johndoe" } });

    const websiteInput = screen.getByPlaceholderText(/Enter website/i);
    expect(websiteInput).toBeInTheDocument();
    fireEvent.change(websiteInput, {
      target: { value: "https://example.com" },
    });

    const submitButton = screen.getByRole("button", { name: /Save/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
  });

  it("Should edit a user when form is successfully submitted", async () => {
    mockListUsers.mockResolvedValueOnce({
      success: true,
      data: [
        {
          id: 1,
          name: "John Doe",
          username: "johndoe",
          email: "john@example.com",
          phone: "1234567890",
          website: "https://example.com",
        },
      ],
      totalCount: 1,
    });

    mockEditUser.mockResolvedValueOnce({
      success: true,
      data: {
        id: 1,
        name: "Jane Doe",
        username: "johndoe",
        email: "jane@example.com",
        phone: "1234567890",
        website: "https://example.com",
      },
    });

    render(<Page />);

    const user = userEvent.setup();

    const johnDoe = await screen.findByText("John Doe");
    expect(johnDoe).toBeInTheDocument();
    const johnDoeRow = johnDoe.closest("tr");
    const actionButton = within(johnDoeRow!).getByRole("button");
    await user.click(actionButton);

    const dropdownItem = await screen.findByText("Edit User");
    expect(dropdownItem).toBeInTheDocument();
    await user.click(dropdownItem);

    const modalText = await screen.findByText(/Edit your user/i);
    expect(modalText).toBeInTheDocument();

    const nameInput = screen.getByPlaceholderText(
      /Enter name/i,
    ) as HTMLInputElement;
    expect(nameInput).toBeInTheDocument();
    expect(nameInput.value).toBe("John Doe");

    const emailInput = screen.getByPlaceholderText(
      /Enter email/i,
    ) as HTMLInputElement;
    expect(emailInput).toBeInTheDocument();
    expect(emailInput.value).toBe("john@example.com");

    const phoneInput = screen.getByPlaceholderText(
      /Enter phone/i,
    ) as HTMLInputElement;
    expect(phoneInput).toBeInTheDocument();
    expect(phoneInput.value).toBe("1234567890");

    const usernameInput = screen.getByPlaceholderText(
      /Enter username/i,
    ) as HTMLInputElement;
    expect(usernameInput).toBeInTheDocument();
    expect(usernameInput.value).toBe("johndoe");

    const websiteInput = screen.getByPlaceholderText(
      /Enter website/i,
    ) as HTMLInputElement;
    expect(websiteInput).toBeInTheDocument();
    expect(websiteInput.value).toBe("https://example.com");

    // update the user name
    fireEvent.change(nameInput, { target: { value: "Jane Doe" } });

    const submitButton = screen.getByRole("button", { name: /Save/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    });
  });

  it("Should delete a user when button is clicked", async () => {
    mockListUsers.mockResolvedValueOnce({
      success: true,
      data: [
        {
          id: 1,
          name: "John Doe",
          username: "johndoe",
          email: "john@example.com",
          phone: "1234567890",
          website: "https://example.com",
        },
      ],
      totalCount: 1,
    });

    mockDeleteUser.mockResolvedValueOnce({
      success: true,
      message: "User deleted successfully",
      data: null,
    });

    render(<Page />);

    const user = userEvent.setup();

    const johnDoe = await screen.findByText("John Doe");
    expect(johnDoe).toBeInTheDocument();
    const johnDoeRow = johnDoe.closest("tr");
    const actionButton = within(johnDoeRow!).getByRole("button");
    await user.click(actionButton);

    const dropdownItem = await screen.findByText("Delete User");
    expect(dropdownItem).toBeInTheDocument();
    await user.click(dropdownItem);

    const modalText = await screen.findByText(
      /Are you sure you want to delete this user?/i,
    );
    expect(modalText).toBeInTheDocument();

    const deleteButton = screen.getByRole("button", { name: /Delete/i });

    await user.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    });
  });

  it("Show show users details when button is clicked", async () => {
    mockListUsers.mockResolvedValueOnce({
      success: true,
      data: [
        {
          id: 1,
          name: "John Doe",
          username: "johndoe",
          email: "john@example.com",
          phone: "1234567890",
          website: "https://example.com",
          company: {
            name: "Example Inc",
            catchPhrase: "Example catch phrase",
            bs: "Example bs",
          },
          address: {
            street: "123 Main St",
            city: "Anytown",
            suite: "Apt 1",
            zipcode: "12345",
            geo: {
              lat: "1234567890",
              lng: "1234567890",
            },
          },
        },
      ],
      totalCount: 1,
    });

    render(<Page />);

    const user = userEvent.setup();

    const johnDoe = await screen.findByText("John Doe");
    expect(johnDoe).toBeInTheDocument();
    const johnDoeRow = johnDoe.closest("tr");
    const actionButton = within(johnDoeRow!).getByRole("button");
    await user.click(actionButton);

    const dropdownItem = await screen.findByText("View User");
    expect(dropdownItem).toBeInTheDocument();
    await user.click(dropdownItem);

    const modalText = await screen.findByText(/John Doe's details/i);
    expect(modalText).toBeInTheDocument();

    const userCompanyName = await screen.findByText(/Example Inc/i);
    expect(userCompanyName).toBeInTheDocument();
  });
});
