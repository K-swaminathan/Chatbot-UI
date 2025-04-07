export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  sessionId: string;
}

export interface FileAnalysis {
  fileName: string;
  type: string;
  size: number;
  summary?: string;
  data?: any[];
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}