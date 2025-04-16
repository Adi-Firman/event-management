import axios from "axios";
import { Event } from "@/types";

const API = "/api/events";

export const getEvents = async (): Promise<Event[]> => {
  const res = await axios.get(API);
  return res.data;
};

export const getEventById = async (id: string): Promise<Event> => {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
};

export const createEvent = async (data: Partial<Event>) => {
  const res = await axios.post(API, data);
  return res.data;
};

export const searchEvents = async (query: {
    search?: string;
    category?: string;
    location?: string;
  }) => {
    const params = new URLSearchParams(query as any).toString();
    const res = await axios.get(`/api/events?${params}`);
    return res.data;
  };
  
