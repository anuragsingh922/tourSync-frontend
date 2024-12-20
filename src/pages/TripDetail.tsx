import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { MessageCircle } from "lucide-react";

const TripDetail = () => {
  const { questionId } = useParams();

  return <div className="max-w-4xl mx-auto space-y-6">Trip Detail</div>;
};

export default TripDetail;
