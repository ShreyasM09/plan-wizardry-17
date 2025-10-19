import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Target } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface GoalFormProps {
  onSubmit: (data: { goal: string; deadline?: Date; expertise: string }) => void;
  isLoading: boolean;
}

export const GoalForm = ({ onSubmit, isLoading }: GoalFormProps) => {
  const [goal, setGoal] = useState("");
  const [deadline, setDeadline] = useState<Date>();
  const [expertise, setExpertise] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goal && expertise) {
      onSubmit({ goal, deadline, expertise });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="goal" className="text-base font-medium">
          What's your goal?
        </Label>
        <Input
          id="goal"
          placeholder="e.g., Learn full-stack web development"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="h-12 text-base"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="expertise" className="text-base font-medium">
          Your current expertise level
        </Label>
        <Select value={expertise} onValueChange={setExpertise} required>
          <SelectTrigger className="h-12" id="expertise">
            <SelectValue placeholder="Select your expertise level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="beginner">Beginner - Just starting out</SelectItem>
            <SelectItem value="intermediate">Intermediate - Some experience</SelectItem>
            <SelectItem value="advanced">Advanced - Experienced practitioner</SelectItem>
            <SelectItem value="expert">Expert - Deep knowledge</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-base font-medium">Target deadline (optional)</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full h-12 justify-start text-left font-normal",
                !deadline && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {deadline ? format(deadline, "PPP") : "Pick a deadline"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={deadline}
              onSelect={setDeadline}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
              disabled={(date) => date < new Date()}
            />
          </PopoverContent>
        </Popover>
      </div>

      <Button
        type="submit"
        variant="gradient"
        size="lg"
        className="w-full h-12 text-base font-semibold"
        disabled={isLoading || !goal || !expertise}
      >
        <Target className="mr-2 h-5 w-5" />
        {isLoading ? "Generating your plan..." : "Generate Action Plan"}
      </Button>
    </form>
  );
};
