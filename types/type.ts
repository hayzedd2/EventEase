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

export interface EventResponse extends eventProps {
  userId: string
}

export type Events = EventResponse[];