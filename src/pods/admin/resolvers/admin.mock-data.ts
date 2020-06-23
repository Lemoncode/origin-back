import { Employee, ProjectSummary } from '../admin.api-model';

const mockProjectSummaryList: ProjectSummary[] = [
  {
    id: '1',
    isAssigned: true,
    projectName: 'Mapfre',
  },
  {
    id: '2',
    isAssigned: false,
    projectName: 'Bankia',
  },
  {
    id: '3',
    isAssigned: false,
    projectName: 'Vacaciones',
  },
  {
    id: '4',
    isAssigned: true,
    projectName: 'Baja',
  },
];

export const mockEmployees: Employee[] = [
  {
    id: '1',
    isActive: true,
    name: 'Daniel Perez',
    email: 'daniel.perez@empresa.com',
    lastDateIncurred: '02/02/2020',
    temporalPassword: 'test',
    projects: mockProjectSummaryList,
  },
  {
    id: '2',
    isActive: true,
    name: 'Jose Gomez',
    email: 'jose.gomez@empresa.com',
    lastDateIncurred: '05/02/2020',
    temporalPassword: 'test',
    projects: mockProjectSummaryList,
  },
  {
    id: '3',
    isActive: false,
    name: 'Manuel Ruiz',
    email: 'manuel.ruiz@empresa.com',
    lastDateIncurred: '06/02/2020',
    temporalPassword: 'test',
    projects: mockProjectSummaryList,
  },
  {
    id: '4',
    isActive: true,
    name: 'Ramón Gomez',
    email: 'ramon.gomez@empresa.com',
    lastDateIncurred: '02/05/2020',
    temporalPassword: 'test',
    projects: mockProjectSummaryList,
  },
  {
    id: '5',
    isActive: false,
    name: 'María Lopez',
    email: 'maria.lopez@empresa.com',
    lastDateIncurred: '05/08/2020',
    temporalPassword: 'test',
    projects: mockProjectSummaryList,
  },
  {
    id: '6',
    isActive: true,
    name: 'Manuel Ortiz',
    email: 'manuel.ortiz@empresa.com',
    lastDateIncurred: '06/06/2020',
    temporalPassword: 'test',
    projects: mockProjectSummaryList,
  },
  {
    id: '7',
    isActive: false,
    name: 'David Martos',
    email: 'david.martos@empresa.com',
    lastDateIncurred: '14/08/2020',
    temporalPassword: 'test',
    projects: mockProjectSummaryList,
  },
  {
    id: '8',
    isActive: true,
    name: 'Luz Roca',
    email: 'luz.roca@empresa.com',
    lastDateIncurred: '20/06/2020',
    temporalPassword: 'test',
    projects: mockProjectSummaryList,
  },
];
