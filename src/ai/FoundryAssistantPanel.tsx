import * as React from 'react';

export default function FoundryAssistantPanel(): JSX.Element {
  const [query, setQuery] = React.useState('');
  const [response, setResponse] = React.useState('');

  const handleAsk = (): void => {
    const q = query.toLowerCase();

    if (q.includes('travel')) {
      setResponse('Recommended Form: Travel Request');
    } else if (q.includes('software')) {
      setResponse('Recommended Form: ITS Software Request');
    } else if (q.includes('curriculum')) {
      setResponse('Recommended Form: Internal Curriculum Change');
    } else {
      setResponse('No matching form found yet.');
    }
  };

  return (
    <div
      style={{
        padding: '24px',
        borderRadius: '16px',
        background: '#1e1e1e',
        color: 'white',
        marginTop: '24px'
      }}
    >
      <h2>FRCC Forms Assistant</h2>

      <p>
        Ask what you need help with and the assistant will recommend the correct form.
      </p>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Example: I need travel approval"
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '8px',
          border: 'none',
          marginTop: '12px'
        }}
      />

      <button
        onClick={handleAsk}
        style={{
          marginTop: '12px',
          padding: '12px 20px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Ask Assistant
      </button>

      {response && (
        <div style={{ marginTop: '20px' }}>
          <strong>{response}</strong>
        </div>
      )}
    </div>
  );
}