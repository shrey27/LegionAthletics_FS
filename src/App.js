import { Suspense, lazy } from 'react';
import { Loader } from './frontend/components';
const LazyLoader = lazy(() => import('./LazyLoader.js'));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <LazyLoader />
    </Suspense>
  );
}

export default App;
