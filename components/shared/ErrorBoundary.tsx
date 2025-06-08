import React, { Component, ErrorInfo, ReactNode } from 'react';
import { toPersianDigits } from '../../utils';
import { ShieldExclamationIcon, ArrowPathIcon } from './AppIcons'; // Assuming ArrowPathIcon for retry

interface Props {
  children: ReactNode;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: _, errorInfo: null }; // Store error in state
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ error, errorInfo }); // Store full error info
  }

  private handleRetry = () => {
    // Attempt to recover by resetting the error state.
    // This might not always work if the underlying issue persists.
    // A more robust solution might involve reloading or navigating.
    this.setState({ hasError: false, error: null, errorInfo: null });
    // Consider adding a prop to allow parent components to define a more specific retry logic
  };
  
  private handleReload = () => {
    window.location.reload();
  }

  public render() {
    if (this.state.hasError) {
      const { fallbackMessage = "متأسفانه مشکلی در این بخش از برنامه رخ داده است." } = this.props;
      return (
        <div className="p-4 md:p-6 m-auto my-6 max-w-md bg-red-50 border-2 border-dashed border-red-300 rounded-xl shadow-lg text-center" role="alert">
          <ShieldExclamationIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-red-700 mb-2">{toPersianDigits("خطا در بارگذاری")}</h2>
          <p className="text-sm text-red-600 mb-4">
            {toPersianDigits(fallbackMessage)}
          </p>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="text-left text-xs text-red-700 bg-red-100 p-2 rounded-md mb-3 overflow-auto max-h-32">
              <summary className="cursor-pointer font-medium">{toPersianDigits("جزئیات خطا (فقط توسعه)")}</summary>
              <pre className="mt-1 whitespace-pre-wrap">
                {this.state.error.toString()}
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
          <div className="flex flex-col sm:flex-row justify-center gap-2">
            <button
              onClick={this.handleRetry}
              className="flex items-center justify-center px-4 py-2 text-xs font-medium text-red-700 bg-red-200 hover:bg-red-300 rounded-md transition-colors"
            >
              <ArrowPathIcon className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0" />
              {toPersianDigits("تلاش مجدد (موقتی)")}
            </button>
             <button
              onClick={this.handleReload}
              className="flex items-center justify-center px-4 py-2 text-xs font-medium text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors"
            >
              {toPersianDigits("بارگذاری مجدد صفحه")}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            {toPersianDigits("اگر مشکل ادامه داشت، لطفاً با پشتیبانی تماس بگیرید.")}
          </p>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
