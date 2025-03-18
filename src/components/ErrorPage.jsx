import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  const errorMessage = error ? (error.statusText || error.message) : "Ha ocurrido un error inesperado.";

  return (
    <div id="error-page" className="container mt-4">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
    </div>
  );
}

export default ErrorPage;

