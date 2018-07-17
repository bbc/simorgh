/* eslint-disable */
page("http://localhost:7080/article/scenario-01", {
    skip: [
      'Design: Content resizing: Text must be styled with units that are resizable in all browsers',
      'Structure: Containers and landmarks: Exactly one main landmark'
    ]
  })