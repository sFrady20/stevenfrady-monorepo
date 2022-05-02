import { Component, ReactNode } from "react";

class ErrorBoundary extends Component<
  { children?: ReactNode },
  { error?: Error }
> {
  constructor(props: any) {
    super(props);
    this.state = { error: undefined };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.warn(error);
  }

  render() {
    if (this.state.error) {
      // You can render any custom fallback UI
      return (
        <>
          Something went wrong: <br /> {this.state.error}
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
