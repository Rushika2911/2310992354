import React from 'react';
import PriorityInbox from './components/PriorityInbox';
function App() {
  return (
    <div>
      <h1>Campus Notifications</h1>
      <PriorityInbox n={10} />
    </div>
  );
}

export default App;