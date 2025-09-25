export default function TableError({ error }: { error: string }) {
  return (
    <div className="error-message" style={{ color: 'red', padding: '20px', textAlign: 'center' }}>
      <h3>Error on loading table data ...</h3>
      <p>{error}</p>
      <button onClick={() => window.location.reload()}>Retry</button>
    </div>
  );
}
