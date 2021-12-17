import React from "react";

import { Actions } from "../../../types";

import ErrorModal from "./ErrorModal";

interface Props {
  actions: Actions;
}

interface State {
  hasError: Boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorModal actions={this.props.actions} />;
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
