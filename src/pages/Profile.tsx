import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/hooks/useAppSelector";
import Avimage from "../components/avatar/image/avatar.jpg";
import { Link } from "react-router-dom";

const NavigationCard = ({ to, title }) => (
  <Link to={to} className="block hover:shadow-lg focus:outline-none focus:ring">
    <Card className="transition-transform transform hover:scale-105">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-center">
          {title}
        </CardTitle>
      </CardHeader>
    </Card>
  </Link>
);

const NavigationGrid = () => (
  <div className="grid grid-cols-2 grid-rows-2 gap-4 p-4">
    <NavigationCard to="/" title="Home" />
    <NavigationCard to="/cart" title="Cart" />
    <NavigationCard to="/booked-trips" title="My Trips" />
    <NavigationCard to="/trips" title="All Trips" />
  </div>
);

const Profile = () => {
  const {
    user,
    status: {
      user: { loading: userLoading, error: userError },
    },
  } = useAppSelector((state) => state.user);
  const [profile, setProfile] = useState({
    name: user?.name,
    email: user?.email,
    avatar: Avimage,
    // avatar: "/placeholder.svg",
  });
  const { toast } = useToast();

  useEffect(() => {
    setProfile((prev) => ({ ...prev, name: user?.name }));
  }, [user]);

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  return (
    <div className="container max-w-2xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profile?.avatar} alt="Profile" />
              <AvatarFallback>{profile?.name}</AvatarFallback>
            </Avatar>
            {/* <Button variant="outline" size="sm">
              <Camera className="mr-2 h-4 w-4" />
              Change Avatar
            </Button> */}
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input value={profile.name} disabled placeholder="Your name" />
            </div>
          </div>

          {NavigationGrid()}
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
