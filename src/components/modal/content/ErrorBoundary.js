import React from "react";

import ErrorModal from "./ErrorModal";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorModal />;
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
