import { SignOutButton, useUser } from "@clerk/clerk-react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const { user } = useUser();

  return (
    <div>
      {user && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={user.imageUrl}
            alt="Profile"
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              marginRight: 8,
            }}
          />
          <span>{user.fullName || user.firstName}</span>
          <SignOutButton redirectUrl="/login">
            <button style={{ marginLeft: 8 }} title="Sair">
              <LogOut className="text-red-500" />
            </button>
          </SignOutButton>
        </div>
      )}
    </div>
  );
}
