import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle2, XCircle, RefreshCw, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/seo-head';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { loadAchievements, loadWorkshops, loadGallery, loadProjects } from '../lib/dataLoader';

type SyncStatus = 'idle' | 'syncing' | 'success' | 'error';

export function Refresh() {
  const navigate = useNavigate();
  const [achStatus, setAchStatus] = useState<SyncStatus>('idle');
  const [workStatus, setWorkStatus] = useState<SyncStatus>('idle');
  const [galStatus, setGalStatus] = useState<SyncStatus>('idle');
  const [projStatus, setProjStatus] = useState<SyncStatus>('idle');
  
  const [errorDetails, setErrorDetails] = useState('');
  const [redirectCount, setRedirectCount] = useState(3);
  const [completed, setCompleted] = useState(false);

  async function triggerRefresh() {
    setErrorDetails('');
    setCompleted(false);
    
    // Clear status
    setAchStatus('syncing');
    setWorkStatus('syncing');
    setGalStatus('syncing');
    setProjStatus('syncing');

    try {
      // 1. Achievements
      await loadAchievements(true);
      setAchStatus('success');

      // 2. Workshops
      await loadWorkshops(true);
      setWorkStatus('success');

      // 3. Gallery
      await loadGallery(true);
      setGalStatus('success');

      // 4. Projects
      await loadProjects(true);
      setProjStatus('success');

      setCompleted(true);
    } catch (error) {
      console.error("Manual revalidation failed:", error);
      const errMsg = error instanceof Error ? error.message : 'Unknown network error. Check Google Sheets publish settings.';
      setErrorDetails(errMsg);
      
      // Update any non-success status to error
      setAchStatus(prev => prev === 'success' ? 'success' : 'error');
      setWorkStatus(prev => prev === 'success' ? 'success' : 'error');
      setGalStatus(prev => prev === 'success' ? 'success' : 'error');
      setProjStatus(prev => prev === 'success' ? 'success' : 'error');
    }
  }

  // Trigger on load
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerRefresh();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Redirect countdown
  useEffect(() => {
    if (!completed) return;
    
    const interval = setInterval(() => {
      setRedirectCount((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [completed, navigate]);

  const getStatusIcon = (status: SyncStatus) => {
    switch (status) {
      case 'syncing':
        return <Loader2 className="h-5 w-5 text-primary animate-spin" />;
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-destructive" />;
      case 'idle':
      default:
        return <Loader2 className="h-5 w-5 text-muted-foreground opacity-50" />;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] py-8 px-4">
      <SEOHead 
        title="Cache Revalidation" 
        description="Manually revalidate and reload Google Sheets data cache." 
      />

      <Card className="w-full max-w-md border-primary/20 bg-linear-to-b from-primary/5 via-transparent to-transparent">
        <CardHeader className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
            <RefreshCw className={`h-6 w-6 ${!completed && achStatus !== 'error' ? 'animate-spin' : ''}`} />
          </div>
          <CardTitle className="text-xl font-extrabold">Data Cache Revalidation</CardTitle>
          <CardDescription>
            Pulls published CSV feeds directly from Google Sheets and updates browser cache.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Progress Rows */}
          <div className="space-y-4 rounded-xl border border-border bg-card p-4 shadow-xs">
            {/* Achievements */}
            <div className="flex items-center justify-between border-b border-border/40 pb-2">
              <span className="text-sm font-semibold text-foreground">🏅 Achievements & Credentials</span>
              {getStatusIcon(achStatus)}
            </div>

            {/* Workshops */}
            <div className="flex items-center justify-between border-b border-border/40 pb-2">
              <span className="text-sm font-semibold text-foreground">🎤 Workshops & Events</span>
              {getStatusIcon(workStatus)}
            </div>

            {/* Gallery */}
            <div className="flex items-center justify-between border-b border-border/40 pb-2">
              <span className="text-sm font-semibold text-foreground">🖼️ Visual Gallery Photos</span>
              {getStatusIcon(galStatus)}
            </div>

            {/* Projects */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">💼 Software Projects</span>
              {getStatusIcon(projStatus)}
            </div>
          </div>

          {/* Success Banner */}
          {completed && (
            <div className="text-center p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-400 space-y-2 animate-in fade-in zoom-in-95 duration-200">
              <p className="text-sm font-bold">Successfully revalidated all feeds!</p>
              <p className="text-xs opacity-90">Redirecting to Home Page in {redirectCount} seconds...</p>
              <Button size="sm" className="mt-2 w-full flex items-center justify-center gap-1.5" onClick={() => navigate('/')}>
                Go to Home Now <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Error Banner */}
          {(achStatus === 'error' || workStatus === 'error' || galStatus === 'error' || projStatus === 'error') && (
            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive space-y-3">
              <p className="text-sm font-bold">Revalidation failed</p>
              <p className="text-xs leading-relaxed">{errorDetails}</p>
              <Button size="sm" variant="destructive" className="w-full flex items-center justify-center gap-1.5" onClick={triggerRefresh}>
                <RefreshCw className="h-4 w-4" /> Retry Revalidation
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
