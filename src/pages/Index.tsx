import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  TrendingUp,
  Award,
  MessageCircle,
  MountainSnowIcon,
  Plane,
  Heart,
  Wallet,
  Globe,
  Users,
  Clock,
} from "lucide-react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Trips from "./Trips";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CancellationPolicy from "@/components/Payment/CancellationPolicy";

const priceComparisonData = [
  { name: "Our Platform", price: 1000, fill: "hsl(var(--primary))" },
  { name: "Competitor A", price: 1500, fill: "#94a3b8" },
  { name: "Competitor B", price: 1800, fill: "#94a3b8" },
];

const benefitsList = [
  {
    icon: Globe,
    title: "Worldwide Destinations",
    description: "Access to exclusive destinations across the globe",
  },
  {
    icon: Users,
    title: "Expert Local Guides",
    description: "Professional guides who know every corner",
  },
  {
    icon: Wallet,
    title: "Best Price Guarantee",
    description: "We match or beat any comparable price",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock assistance for peace of mind",
  },
];

const Index = () => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20 animate-fade-up">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Book your Dream Trip
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          We are here to make your dream complete by providing great and
          affordable trip!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {!user && (
            <Button size="lg" asChild>
              <Link to="/auth">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}

          {user && user?.role === "organizer" && (
            <Button size="lg" asChild>
              <Link to="/manage-trips">Manage Trips</Link>
            </Button>
          )}
          {user && user?.role === "user" && (
            <Button size="lg" asChild>
              <Link to="/trips">Explore Our Destinations</Link>
            </Button>
          )}
        </div>
      </section>

      {/* Trending Questions Section */}
      <section className="px-4 mb-12">
        {/* {user && user?.role === "organizer" ? (
        )
         : (
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <MountainSnowIcon className="h-6 w-6 text-primary" />
            Trips
          </h2>
        )} */}
        {/* {loadingTrips ? (
          <div className="text-center py-8">Loading Trips...</div>
        ) : (
          <div className="space-y-4">
            {trips.slice(0, 3).map((trip) => (
              <QuestionCard key={trip._id} trip={trip} />
            ))}
          </div>
        )} */}
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 inline-block">
              Why Travel With Us
            </span>
            <h2 className="text-4xl font-bold mb-4">
              Experience the Difference
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover why thousands choose our platform for their travel
              adventures
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefitsList.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                  <benefit.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 inline-block">
              Pricing Comparison
            </span>
            <h2 className="text-4xl font-bold mb-4">
              Best Value for Your Money
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how we compare to other travel platforms
            </p>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priceComparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="price" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Available Trips Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 inline-block">
              Available Trips
            </span>
            <h2 className="text-4xl font-bold mb-4">
              Explore Our Destinations
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find your perfect trip from our carefully curated selection
            </p>
          </div>
          <Trips />
        </div>
      </section>

      <section>
        <CancellationPolicy/>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-8 rounded-lg border bg-card hover:shadow-lg transition-shadow"
            >
              <Plane className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Plan Your Journey</h3>
              <p className="text-muted-foreground">
                Customize your perfect trip with our expert travel planners
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center text-center p-8 rounded-lg border bg-card hover:shadow-lg transition-shadow"
            >
              <Heart className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Travel with Passion
              </h3>
              <p className="text-muted-foreground">
                Experience authentic local culture and create lasting memories
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center text-center p-8 rounded-lg border bg-card hover:shadow-lg transition-shadow"
            >
              <Award className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Premium Experience</h3>
              <p className="text-muted-foreground">
                Enjoy exclusive benefits and premium service throughout your
                journey
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
