import Alert from 'react-bootstrap/Alert';

function AlertModal() {
  return (
    <>
      {[
        'success',
      ].map((variant) => (
        <Alert key={variant} variant={variant}>
          Your Visit in booked successfully!
        </Alert>
      ))}
    </>
  );
}

export default AlertModal;