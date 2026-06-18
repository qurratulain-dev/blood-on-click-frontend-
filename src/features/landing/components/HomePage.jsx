import { UserPlus, Hospital, Search, CheckCircle, Heart } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-red-600">Welcome to Blood on Click</h1>
        <p className="mt-2 text-xl text-muted-foreground">Your Emergency Blood Donation Partner</p>
        <hr className="my-6" />
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <Card className="text-center shadow">
          <CardContent className="flex flex-col items-center gap-4 p-6">
            <UserPlus className="size-12 text-red-600" />
            <CardTitle>Register as Donor</CardTitle>
            <p className="text-sm text-muted-foreground">Join us to save lives by donating blood. Be a hero!</p>
            <Link to="/register?role=donor">
              <Button variant="destructive">Register Now</Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="text-center shadow">
          <CardContent className="flex flex-col items-center gap-4 p-6">
            <Hospital className="size-12 text-red-600" />
            <CardTitle>Blood Banks</CardTitle>
            <p className="text-sm text-muted-foreground">Find nearest blood banks and check blood availability</p>
            <Link to="/login?role=blood_bank">
              <Button variant="outline">Bank Login</Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="text-center shadow">
          <CardContent className="flex flex-col items-center gap-4 p-6">
            <Search className="size-12 text-red-600" />
            <CardTitle>Need Blood?</CardTitle>
            <p className="text-sm text-muted-foreground">Search for blood donors and banks near you</p>
            <Link to="/login?role=seeker">
              <Button variant="outline">Seeker Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 rounded-xl bg-muted p-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-xl font-semibold">Why Choose Blood on Click?</h3>
            <ul className="space-y-2">
              {[
                "Find nearest blood donors",
                "Real-time blood stock updates",
                "Emergency notifications",
                "Track donation history",
                "Medical assessment records",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle className="size-5 text-red-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-xl font-semibold">Blood Donation Tips</h3>
            <ul className="space-y-2">
              {[
                "Eat iron-rich foods before donation",
                "Get plenty of sleep",
                "Stay hydrated",
                "Avoid fatty foods",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Heart className="size-5 text-red-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
