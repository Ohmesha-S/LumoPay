import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in LumoPay application:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl p-6 shadow-xl border border-amber-200 text-center space-y-4">
            <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-3xl mx-auto">
              ₹
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">LumoPay</h2>
              <p className="text-xs text-amber-700 font-semibold mt-1">
                ऐप लोड करने में समस्या आई • Reloading
              </p>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl text-left text-xs font-mono text-slate-600 max-h-32 overflow-auto border border-slate-200">
              {this.state.error?.message || 'Unknown UI Error'}
            </div>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-2xl text-xs shadow-md transition-all active:scale-95"
            >
              दोबारा लोड करें (Reload App)
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
