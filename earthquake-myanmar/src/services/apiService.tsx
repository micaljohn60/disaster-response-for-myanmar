const API_URL = process.env.NEXT_PUBLIC_API_URL;

type MissingPersonInput = {
  name: string;
  location: string;
  lat: number;
  lng: number;
  image: string;
  noticeable_mark: string;
};

const apiService = {
  async addMissingPerson(dataProps: MissingPersonInput) {
    try {
      const response = await fetch(
        `${API_URL}/api/missingperson/person/rescue/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataProps),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Fail To add Missing Person");
      }

      return data;
    } catch (error) {
      console.log("Error in API Service");
      console.log(error);
      throw error;
    }
  },

  async getAllMissingPerson() {
    try {
      const response = await fetch(
        `http://localhost:5001/api/missingperson/persons/lists`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `Error Fetching Data`);
      }
      return data;
    } catch (error) {
      // console.error("Error fetching missing persons:", error.message);
      throw error;
    }
  },
};

export default apiService;
