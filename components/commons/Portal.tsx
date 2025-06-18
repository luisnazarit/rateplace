import ReactDOM from "react-dom";

const Portal = ({ children }) => {
  const portalRoot = document.body;

  if (!portalRoot) {
    console.error("El elemento #portal-root no existe en el DOM.");
    return null;
  }

  return ReactDOM.createPortal(children, portalRoot);
};

export default Portal;