/*
Copyright (C) 2019 Roberto García Calero (garcalrob@gmail.com)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import Repository from './Repository';

const resource = '/trends';

export default {
  async getTrendsInLocation(locationId) {
    let result;

    try {
      result = (await Repository.get(`${resource}?woeid=${locationId}`)).data;
    } catch {
      console.error(`Could not retrieve the current trends for location ${locationId}`);
    }

    return result;
  },

  async getTrendEvolutionInAllLocations(trendId) {
    let result;

    try {
      result = (await Repository.get(
        `${resource}/evolution/trends/${encodeURIComponent(trendId)}`,
      )).data;
    } catch {
      console.error(`Could not retrieve the evolution of trend ${trendId} in all locations`);
    }

    return result;
  },

  async getTrendEvolution(locationId, trendId) {
    let result;

    try {
      result = (await Repository.get(
        `${resource}/evolution/trends/${encodeURIComponent(trendId)}/places/${locationId}`,
      )).data;
    } catch {
      console.error(
        `Could not retrieve the evolution of trend ${trendId} in location ${locationId}`,
      );
    }

    return result;
  },

  async getTopTrends() {
    let result;

    try {
      result = (await Repository.get(`${resource}?top=true`)).data;
    } catch {
      console.error('Could not retrieve the top trends');
    }

    return result;
  },

  async searchTrend(query) {
    let result;

    try {
      result = (await Repository.get(
        `${resource}?name=${encodeURIComponent(query)}`,
      )).data;
    } catch {
      console.error(`Could not look for trends matching query: "${query}"`);
    }

    return result;
  },
};
