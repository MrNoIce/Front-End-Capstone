const remoteURL = "http://localhost:5002";

export default {
  get(resource, id) {
    return fetch(`${remoteURL}/${resource}/${id}`).then(e => e.json());
  },
  all(userId) {
    return fetch(`${remoteURL}/issues?userId=${userId}`).then(issueData =>
      issueData.json()
    );
  },

  post(resource, resourceObj) {
    return fetch(`${remoteURL}/${resource}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(resourceObj)
    }).then(data => data.json());
  },

  delete(resource, id) {
    return fetch(`${remoteURL}/${resource}/${id}`, {
      method: "DELETE"
    }).then(data => data.json());
  },

  put(resource, editedObj) {
    return fetch(`${remoteURL}/${resource}/${editedObj.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedObj)
    }).then(data => data.json());
  }
};
