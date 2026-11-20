import { profile } from '@/data/profile';

export function Footer() {
  return (
    <footer className="px-[clamp(1.25rem,4vw,3rem)] pb-8 text-center text-sm opacity-80">
      © {new Date().getFullYear()} {profile.name}
    </footer>
  );
}
