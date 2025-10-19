import { Calendar, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TaskCardProps {
  task: {
    id: number;
    title: string;
    deadline: string;
    dependencies: number[];
  };
  index: number;
}

export const TaskCard = ({ task, index }: TaskCardProps) => {
  return (
    <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-sm">
          {index + 1}
        </div>
        <div className="flex-1 space-y-3">
          <h3 className="text-lg font-semibold text-foreground">{task.title}</h3>
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{task.deadline}</span>
            </div>
            {task.dependencies.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                Depends on Task {task.dependencies.join(", ")}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
