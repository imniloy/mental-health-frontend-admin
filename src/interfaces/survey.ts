export interface AnswerOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  title: string;
  subtitle?: string;
  isMultipleChoice: boolean;
  isRequired: boolean;
  options: AnswerOption[];
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  status: 'Enabled' | 'Disabled';
  questions: Question[];
  lastModified: string;
}
