export interface User {
  email: string;
  id: number;
  userId: string;
  userName: string;
}
export interface UserResponse {
  user: User;
}
export interface ErrorResponse {
  message: string;
}

export interface eventProps {
  id: number;
  name: string;
  description: string;
  location: string;
  startDate: string;
  startTime : string
  category : string
}

export interface EventResponse {
  ID: number;
  Name: string;
  Description: string;
  Location: string;
  StartDate: string;
  StartTime : string
  Category : string
  
  UserId: string;
}

export type Events = EventResponse[];