//this class is just missing the .headers for when you install full APIs functionality
export default class Api {
  constructor({ dataUrl }) {
    this.dataUrl = dataUrl;
  }

  getResortData() {
    return fetch(this.dataUrl)
      .then(this._handleRequest)
      .catch((error) => {
        console.error(`Error fetching Resort data: `, error);
        throw error;
      })
  }

  _handleRequest(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }
}

const api = new Api({
  dataUrl: "./data/data.json",
});

export { api };

