import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props { children: ReactNode; }
interface State { error: Error | null; }

/** 攔子樹 render 錯誤，避免整頁白畫面。 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State { return { error }; }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="container-content py-20 text-center">
          <h1 className="text-2xl font-semibold">畫面發生錯誤</h1>
          <p className="mt-3 text-sm text-content-secondary">
            {this.state.error.message}
          </p>
          <button
            onClick={() => this.setState({ error: null })}
            className="btn-ghost mt-6"
          >
            重試
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
