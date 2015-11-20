import React from 'react';

export default class Box extends React.Component {
  render() {
    return (
      <div className="commentBox">
        <h1>Metro Trains Outage Info</h1>
        <p>Info comes from the <a href="https://www.data.vic.gov.au/data/dataset/ptv-timetable-api">ptv api</a></p>
      </div>
    );
  }
};
