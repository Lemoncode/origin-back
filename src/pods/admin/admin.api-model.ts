export interface Employee {
  id: string;
  isActive: boolean;
  name: string;
  email: string;
  lastDateIncurred?: string;
  temporalPassword?: string;
  projects?: EmployeeProject[];
}

export interface EmployeeProject {
  id: string;
  isAssigned?: boolean;
}

export interface Project {
  id: string;
  name: string;
  code: string;
  externalId?: string;
  comments?: string;
  isActive: boolean;
  lastDateIncurred?: string;
  creationDate: string;
  employees?: ProjectEmployee[];
}

export interface ProjectEmployee {
  id: string;
  isAssigned?: boolean;
}
