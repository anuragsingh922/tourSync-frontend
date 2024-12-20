import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, X, ChevronDown, ShoppingBagIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AvatarImg from "../avatar/image/avatar.jpg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { logout } from "@/store/slices/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userImage = AvatarImg;

  const dispatch = useAppDispatch();

  const {
    user,
    status: {
      user: { loading: userLoading, error: userError },
    },
  } = useAppSelector((state) => state.user);

  const handlesignout = () => {
    if (!user) {
      navigate("/");
    } else if (userError) {
      navigate("/");
    }
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">TourSync</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {/* <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search questions..."
                className="pl-10 w-full"
              />
            </div> */}
            <Link
              to="/cart"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              <ShoppingBagIcon />
            </Link>
            <Link
              to="/booked-trips"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Booked Trips
            </Link>
            {/* <Link
              to="/tags"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Tags
            </Link> */}

            {/* User Avatar and Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userImage || undefined} />
                  </Avatar>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              {user && user.name ? (
                <>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/cart">Cart</Link>
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem asChild>
                      <Link to="/stats">Stats</Link>
                    </DropdownMenuItem> */}
                    <DropdownMenuItem asChild>
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          document.cookie =
                            "asktoken=null; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                          dispatch(logout());
                          handlesignout();
                        }}
                      >
                        Sign Out
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </>
              ) : (
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/auth">Sign In</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t p-4 space-y-4 animate-in">
          {/* <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search questions..."
              className="pl-10 w-full"
            />
          </div> */}
          <nav className="flex flex-col space-y-4">
            <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Link
                to="/profile"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Profile
              </Link>
            </div>
            <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Link
                to="/cart"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Cart
              </Link>
            </div>
            <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Link
                to="/booked-trips"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Booked Trips
              </Link>
            </div>
            {user && (
              <Button variant="default" asChild className="w-full">
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    document.cookie =
                      "asktoken=null; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    setIsMenuOpen(!isMenuOpen);
                    dispatch(logout());
                    handlesignout();
                  }}
                >
                  Sign Out
                </div>
              </Button>
            )}

            {!user && (
              <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Button variant="default" asChild className="w-full">
                  <Link to="/auth">Sign in</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
