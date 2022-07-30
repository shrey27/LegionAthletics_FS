import { Suspense, lazy } from 'react';
import { Loader } from '../../components';
import './homepage.css';
const LazyHomepage = lazy(() => import('./LazyHomepage'));

export default function HomePage() {
  return (
    <Suspense fallback={<Loader />}>
      <LazyHomepage />
    </Suspense>
  );
}
