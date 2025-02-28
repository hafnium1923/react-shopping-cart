import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Header";
import CartTextButton from "../../CartTextButton/CartTextButton";

const meta: Meta<typeof Header> = {
  title: "Header",
  component: Header,
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    children: <CartTextButton />,
  },
  decorators: [
    (Story) => (
      <Router>
        <Story />
      </Router>
    ),
  ],
};
