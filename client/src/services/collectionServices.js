import { Apis, endpoints } from '../configs/Apis';

export const collectionServices = {
  getCollections: async () => {
    return await Apis().get(endpoints.collections);
  },

  getCollectionById: async (id) => {
    return await Apis().get(endpoints.collectionDetail(id));
  },

  createCollection: async (data) => {
    return await Apis().post(endpoints.collections, data);
  },

  updateCollection: async (id, data) => {
    return await Apis().put(endpoints.collectionDetail(id), data);
  },

  deleteCollection: async (id) => {
    return await Apis().delete(endpoints.collectionDetail(id));
  },

  // Artworks
  getArtworkById: async (id) => {
    return await Apis().get(endpoints.artworkDetail(id));
  },

  createArtwork: async (data) => {
    return await Apis().post(`${endpoints.collections}/artworks`, data);
  },

  updateArtwork: async (id, data) => {
    return await Apis().put(endpoints.artworkDetail(id), data);
  },

  deleteArtwork: async (id) => {
    return await Apis().delete(endpoints.artworkDetail(id));
  },
};

export default collectionServices;

