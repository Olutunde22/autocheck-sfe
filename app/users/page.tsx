import Users from "@/components/users";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Autocheck - Users",
  description: "List of users",
};

export default function Page() {
  return <Users />;
}
