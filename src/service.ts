export class HotelReservationAPIService {
    public async getSearchResults(): Promise<Response> {
      const response = await fetch(
        `http://localhost:8000/api/get_records`
      );
      return await response.json();
    }
}