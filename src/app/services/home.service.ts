import {Injectable} from '@angular/core';
import {useApi} from "../../hooks/useApi";
import {Candidate} from "../interfaces/candidate";
import {API_ENDPOINTS} from "../../config";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private api = useApi();

  async getCandidateDetails(id: string): Promise<Candidate> {
    const url = `${API_ENDPOINTS.CANDIDATES}/${id}`;
    console.log('API call URL:', url);
    console.log('Environment:', environment);

    try {
      const response = await this.api.get<Candidate>(url);
      console.log('API response:', response);
      return response;
    } catch (error) {
      console.error('API call error:', error);
      throw error;
    }
  }

}
