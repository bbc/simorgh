import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'bbc_temp_saved_articles';
const EXPIRY_KEY = 'bbc_temp_saved_articles_expiry';
const EXPIRY_DAYS = 2;

export interface TemporarySavedArticle {
  id: string;
  title: string;
  link: string;
  imageUrl?: string;
  imageAlt?: string;
  promoImage?: string;
  type: string;
  description: string;
  savedAt: number;
}

interface UseTemporarySavedArticlesReturn {
  savedArticles: TemporarySavedArticle[];
  saveArticle: (article: Omit<TemporarySavedArticle, 'savedAt'>) => void;
  removeArticle: (articleId: string) => void;
  isArticleSaved: (articleId: string) => boolean;
  expiryDate: Date | null;
  clearAll: () => void;
  hasExpired: boolean;
}

const useTemporarySavedArticles = (): UseTemporarySavedArticlesReturn => {
  const [savedArticles, setSavedArticles] = useState<TemporarySavedArticle[]>(
    [],
  );
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);
  const [hasExpired, setHasExpired] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedArticles = localStorage.getItem(STORAGE_KEY);
    const storedExpiry = localStorage.getItem(EXPIRY_KEY);

    if (storedExpiry) {
      const expiry = new Date(parseInt(storedExpiry, 10));
      setExpiryDate(expiry);

      // Check if expired
      if (new Date() > expiry) {
        setHasExpired(true);
        // Clear expired data
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(EXPIRY_KEY);
        setSavedArticles([]);
        setExpiryDate(null);
        return;
      }
    }

    if (storedArticles) {
      try {
        const articles = JSON.parse(storedArticles);
        setSavedArticles(articles);
      } catch {
        // Invalid data, clear it
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const saveArticle = useCallback(
    (article: Omit<TemporarySavedArticle, 'savedAt'>) => {
      if (typeof window === 'undefined') return;

      const newArticle: TemporarySavedArticle = {
        ...article,
        savedAt: Date.now(),
      };

      setSavedArticles(prev => {
        // Check if already saved
        if (prev.some(a => a.id === article.id)) {
          return prev;
        }

        const updated = [newArticle, ...prev];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

        // Set expiry if not already set
        const storedExpiry = localStorage.getItem(EXPIRY_KEY);
        if (!storedExpiry) {
          const expiry = new Date();
          expiry.setDate(expiry.getDate() + EXPIRY_DAYS);
          localStorage.setItem(EXPIRY_KEY, expiry.getTime().toString());
          setExpiryDate(expiry);
        }

        return updated;
      });
    },
    [],
  );

  const removeArticle = useCallback((articleId: string) => {
    if (typeof window === 'undefined') return;

    setSavedArticles(prev => {
      const updated = prev.filter(a => a.id !== articleId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const isArticleSaved = useCallback(
    (articleId: string) => {
      return savedArticles.some(a => a.id === articleId);
    },
    [savedArticles],
  );

  const clearAll = useCallback(() => {
    if (typeof window === 'undefined') return;

    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(EXPIRY_KEY);
    setSavedArticles([]);
    setExpiryDate(null);
  }, []);

  return {
    savedArticles,
    saveArticle,
    removeArticle,
    isArticleSaved,
    expiryDate,
    clearAll,
    hasExpired,
  };
};

export default useTemporarySavedArticles;
