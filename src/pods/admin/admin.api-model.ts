export interface Employee {
  id: string;
  isActive: boolean;
  name: string;
  email: string;
  lastDateIncurred: string;
  temporalPassword?: string;
  projects?: ProjectSummary[];
}

export interface ProjectSummary {
  id: string;
  isAssigned?: boolean;
  projectName: string;
}
