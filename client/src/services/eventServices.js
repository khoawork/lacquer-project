import { Apis, endpoints } from '../configs/Apis';

export const eventServices = {
  getEvents: async (params = {}) => {
    return await Apis().get(endpoints.events, { params });
  },

  getEventById: async (id) => {
    return await Apis().get(endpoints.eventDetail(id));
  },

  createEvent: async (eventData) => {
    return await Apis().post(endpoints.events, eventData);
  },

  updateEvent: async (id, eventData) => {
    return await Apis().put(endpoints.eventDetail(id), eventData);
  },

  deleteEvent: async (id) => {
    return await Apis().delete(endpoints.eventDetail(id));
  },
};

export default eventServices;
