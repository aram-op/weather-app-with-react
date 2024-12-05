import '../styles/error-message.css';

function ErrorMessage({message} : {message: string}) {
    return (
        <h2 className="error-message">{message}</h2>
    );
}

export default ErrorMessage;