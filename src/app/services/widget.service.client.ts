export class WidgetServiceClient {
  findWidgetsForTopic(topicId) {
    return fetch('http://localhost:8080/api/topic/' + topicId + '/widgets')
      .then(response => response.json());
  }
}
