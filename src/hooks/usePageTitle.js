import { useEffect } from 'react';

const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title ? `${title} | SportNest` : 'SportNest';
  }, [title]);
};

export default usePageTitle;