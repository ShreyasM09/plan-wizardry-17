import { TaskCard } from "./TaskCard";

interface Task {
  id: number;
  task: string;
  description: string;
  start_date: string;
  end_date: string;
  dependencies: number[];
}

interface TaskTimelineProps {
  tasks: Task[];
}

export const TaskTimeline = ({ tasks }: TaskTimelineProps) => {
  return (
    <div className="space-y-6 relative">
      {/* Timeline line */}
      <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20" />
      
      {/* Tasks */}
      <div className="space-y-6">
        {tasks.map((task, index) => (
          <div key={task.id} className="relative animate-in fade-in slide-in-from-left duration-500" style={{ animationDelay: `${index * 100}ms` }}>
            <TaskCard task={task} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
};
