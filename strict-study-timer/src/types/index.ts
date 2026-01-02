export interface Task {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  status: 'ACTIVE' | 'TIME_OVER' | 'COMPLETED';
}
