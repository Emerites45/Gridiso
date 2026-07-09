import { redirect } from 'next/navigation';

export default function Home() {
  // Redirige immédiatement vers le dashboard
  redirect('/dashboard');
}