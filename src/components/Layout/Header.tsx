import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Car, Menu, X, Moon, Sun, User, LogIn } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface UserData {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
}

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const Header = ({ currentPage, onPageChange }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  // Auth form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupData, setSignupData] = useState<UserData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const darkMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    }

    // Check if user is logged in
    const loggedInUser = localStorage.getItem("currentUser");
    if (loggedInUser) {
      setIsLoggedIn(true);
      setCurrentUser(JSON.parse(loggedInUser));
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
    document.documentElement.classList.toggle("dark");
  };

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u: UserData) => u.email === loginEmail && u.password === loginPassword
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      setIsLoggedIn(true);
      setCurrentUser(user);
      setIsLoginModalOpen(false);
      setError("");
    } else {
      setError("Invalid email or password");
    }
  };

  const handleSignup = () => {
    // Basic validation
    if (!signupData.name || !signupData.email || !signupData.password) {
      setError("Please fill in all required fields");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Check if user already exists
    if (users.some((u: UserData) => u.email === signupData.email)) {
      setError("User with this email already exists");
      return;
    }

    const newUser = { ...signupData };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    setIsLoggedIn(true);
    setCurrentUser(newUser);
    setIsSignupModalOpen(false);
    setError("");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    setCurrentUser(null);
    onPageChange("home");
  };

  const navItems = [
    { name: "Home", id: "home" },
    { name: "Cars", id: "cars" },
    { name: "Book", id: "booking" },
    { name: "Owner", id: "owner" },
    { name: "Profile", id: "profile" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 navbar-blur shadow-lg`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onPageChange("home")}>
            <div className="p-2 bg-gradient-accent rounded-lg">
              <Car className="h-6 w-6 text-accent-foreground" />
            </div>
            <span className="text-xl font-display font-bold text-foreground">
              DriveEase
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`font-medium transition-colors duration-200 ${
                  currentPage === item.id
                    ? "text-accent"
                    : "text-foreground hover:text-accent"
                }`}>
                {item.name}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="p-2">
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {isLoggedIn ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => onPageChange("profile")}
                  className="btn-outline">
                  <User className="h-4 w-4 mr-2" />
                  {currentUser?.name || "Profile"}
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-foreground hover:text-accent">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Dialog
                  open={isLoginModalOpen}
                  onOpenChange={setIsLoginModalOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setAuthMode("login");
                        setError("");
                      }}
                      className="text-foreground hover:text-accent">
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Login to your account</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      {error && (
                        <div className="text-red-500 text-sm">{error}</div>
                      )}
                      <div className="space-y-2">
                        <Label htmlFor="login-email">Email</Label>
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="Enter your email"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="login-password">Password</Label>
                        <Input
                          id="login-password"
                          type="password"
                          placeholder="Enter your password"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <Button onClick={handleLogin}>Login</Button>
                        <Button
                          variant="link"
                          onClick={() => {
                            setAuthMode("signup");
                            setIsLoginModalOpen(false);
                            setIsSignupModalOpen(true);
                          }}>
                          Create an account
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={isSignupModalOpen}
                  onOpenChange={setIsSignupModalOpen}>
                  <DialogTrigger asChild>
                    <Button
                      className="btn-hero"
                      onClick={() => {
                        setAuthMode("signup");
                        setError("");
                      }}>
                      Sign Up
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create a new account</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      {error && (
                        <div className="text-red-500 text-sm">{error}</div>
                      )}
                      <div className="space-y-2">
                        <Label htmlFor="signup-name">Full Name*</Label>
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="Enter your full name"
                          value={signupData.name}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email*</Label>
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="Enter your email"
                          value={signupData.email}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-phone">Phone Number</Label>
                        <Input
                          id="signup-phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          value={signupData.phone}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              phone: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-address">Address</Label>
                        <Input
                          id="signup-address"
                          type="text"
                          placeholder="Enter your address"
                          value={signupData.address}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              address: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password*</Label>
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="Create a password"
                          value={signupData.password}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              password: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <Button onClick={handleSignup}>Sign Up</Button>
                        <Button
                          variant="link"
                          onClick={() => {
                            setAuthMode("login");
                            setIsSignupModalOpen(false);
                            setIsLoginModalOpen(true);
                          }}>
                          Already have an account?
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="p-2">
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2">
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <nav className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left font-medium transition-colors duration-200 ${
                    currentPage === item.id
                      ? "text-accent"
                      : "text-foreground hover:text-accent"
                  }`}>
                  {item.name}
                </button>
              ))}
              <div className="pt-4 space-y-2">
                {isLoggedIn ? (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => {
                        onPageChange("profile");
                        setIsMenuOpen(false);
                      }}
                      className="w-full btn-outline">
                      <User className="h-4 w-4 mr-2" />
                      {currentUser?.name || "Profile"}
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-foreground hover:text-accent">
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsLoginModalOpen(true);
                        setIsMenuOpen(false);
                        setAuthMode("login");
                      }}
                      className="w-full">
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                    <Button
                      className="w-full btn-hero"
                      onClick={() => {
                        setIsSignupModalOpen(true);
                        setIsMenuOpen(false);
                        setAuthMode("signup");
                      }}>
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
