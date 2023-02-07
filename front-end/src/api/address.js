import instance from "../configs/axios";

const address = {
  getAllCity() {
    const url = "/api/v1/address/city";
    return instance.get(url);
  },

  getListDistrictByIdCity(idCity) {
    const url = "/api/v1/address/district?id=" + idCity;
    return instance.get(url);
  },

  getListStreetByIdDistrict(idDistrict) {
    const url = "/api/v1/address/street?id=" + idDistrict;
    return instance.get(url);
  },
};

export default address;
