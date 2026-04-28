export enum UserIntent {
  PERSONAL = 'PERSONAL',
  WORK = 'WORK',
  EDUCATION = 'EDUCATION',
}

export enum TeamSize {
  JUST_ME = 'JUST_ME',
  SMALL_TEAM = 'SMALL_TEAM',
  MEDIUM_TEAM = 'MEDIUM_TEAM',
  LARGE_TEAM = 'LARGE_TEAM',
}

export enum UserRole {
  DEVELOPER = 'DEVELOPER',
  MANAGER = 'MANAGER',
  DESIGNER = 'DESIGNER',
  OTHER = 'OTHER',
}

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  IN_REVIEW = 'IN_REVIEW',
  DONE = 'DONE',
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export enum WorkspaceRole {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  VIEWER = 'VIEWER',
}

export enum AssignmentStatus {
  PENDING = 'PENDING',
  SUBMITTED = 'SUBMITTED',
  GRADED = 'GRADED',
}
