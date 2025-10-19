import { useState } from "react";
import { GoalForm } from "@/components/GoalForm";
import { TaskTimeline } from "@/components/TaskTimeline";
import { Card } from "@/components/ui/card";
import { Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Task {
  id: number;
  title: string;
  deadline: string;
  dependencies: number[];
}

const Index = () => {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [goalData, setGoalData] = useState<{ goal: string; deadline?: Date; expertise: string } | null>(null);

  // Mock API call - in production, this would call your backend
  const handleFormSubmit = async (data: { goal: string; deadline?: Date; expertise: string }) => {
    setIsLoading(true);
    setGoalData(data);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock response based on expertise level
      const mockTasks: Task[] = [
        {
          id: 1,
          title: "Research and identify core concepts",
          deadline: "Week 1",
          dependencies: [],
        },
        {
          id: 2,
          title: "Set up development environment and tools",
          deadline: "Week 1",
          dependencies: [],
        },
        {
          id: 3,
          title: "Complete foundational tutorials",
          deadline: "Week 2-3",
          dependencies: [1, 2],
        },
        {
          id: 4,
          title: "Build first practice project",
          deadline: "Week 4-5",
          dependencies: [3],
        },
        {
          id: 5,
          title: "Learn advanced techniques and best practices",
          deadline: "Week 6-7",
          dependencies: [4],
        },
        {
          id: 6,
          title: "Create portfolio project",
          deadline: "Week 8-10",
          dependencies: [5],
        },
        {
          id: 7,
          title: "Review, refine, and document learnings",
          deadline: "Week 11-12",
          dependencies: [6],
        },
      ];

      setTasks(mockTasks);
      toast.success("Action plan generated successfully!");
    } catch (error) {
      toast.error("Failed to generate plan. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setTasks(null);
    setGoalData(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border backdrop-blur-sm sticky top-0 z-10 bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Goal Planner</h1>
              <p className="text-xs text-muted-foreground">Break down your ambitions into achievable steps</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {!tasks ? (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Transform Your Goals Into{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Action Plans
                </span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Get a personalized, step-by-step roadmap tailored to your expertise level
              </p>
            </div>

            <Card className="p-8 border-border bg-card/50 backdrop-blur-sm">
              <GoalForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            </Card>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={handleReset} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Start Over
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Your Action Plan</h2>
                <p className="text-lg text-muted-foreground">
                  Goal: <span className="text-foreground font-medium">{goalData?.goal}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Expertise: <span className="capitalize">{goalData?.expertise}</span>
                  {goalData?.deadline && ` • Target: ${goalData.deadline.toLocaleDateString()}`}
                </p>
              </div>

              <Card className="p-8 border-border bg-card/50 backdrop-blur-sm">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Sequential Tasks</h3>
                  <p className="text-sm text-muted-foreground">
                    Follow these steps in order to achieve your goal. Tasks with dependencies should be completed
                    after their prerequisites.
                  </p>
                </div>
                <TaskTimeline tasks={tasks} />
              </Card>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Built to help you achieve your goals, one step at a time
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
